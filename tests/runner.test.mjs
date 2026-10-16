import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import {
  DEFAULT_VERSION, parseArgs, locations, status, nodeSupported,
  runnerEnv, install, readCapsule
} from '../work-plugin/skills/mojulo/scripts/runner.mjs';

function scratch(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mojulo-plugin-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test('release target is exactly 3.1.0 and refuses unpinned npm ranges', () => {
  assert.equal(DEFAULT_VERSION, '3.1.0');
  assert.equal(parseArgs(['status', '--workspace', '/tmp/work']).version, '3.1.0');
  assert.throws(() => parseArgs(['install', '--workspace', '/tmp/work', '--version', 'latest']), /exact Mojulo version/);
  assert.throws(() => parseArgs(['install', '--workspace', '/tmp/work', '--version', '^3.1.0']), /exact Mojulo version/);
  assert.throws(() => parseArgs(['exec', '--workspace', '/tmp/work', '--', 'delete']), /exec requires/);
  assert.throws(() => parseArgs(['status', '--workspace', 'relative/path']), /absolute/);
});

test('runtime requirement stays at Node >=22.14', () => {
  assert.equal(nodeSupported('22.13.9'), false);
  assert.equal(nodeSupported('22.14.0'), true);
  assert.equal(nodeSupported('24.0.0'), true);
  assert.equal(nodeSupported('20.18.0'), false);
});

test('status does not create a runtime or migrate previous plugin data', (t) => {
  const workspace = scratch(t);
  const opts = parseArgs(['status', '--workspace', workspace]);
  const before = fs.readdirSync(workspace);
  assert.equal(status(opts).ok, false);
  assert.deepEqual(fs.readdirSync(workspace), before);
  assert.equal(fs.existsSync(locations(opts).root), false);
  fs.mkdirSync(path.join(workspace, '.mojulo'));
  fs.mkdirSync(path.join(workspace, '.mojulo-runtime'));
  const report = status(opts);
  assert.ok(report.legacyWorkspace);
  assert.equal(report.legacyWorkspace.home, path.join(workspace, '.mojulo'));
  assert.equal(report.legacyWorkspace.runtime, path.join(workspace, '.mojulo-runtime'));
  assert.equal(fs.existsSync(locations(opts).root), false);
});

test('each CLI invocation overrides inherited data paths for isolation', (t) => {
  const workspace = scratch(t);
  const opts = parseArgs(['status', '--workspace', workspace]);
  const env = runnerEnv(opts, { MOJULO_HOME: '/stale', MOJULO_DATA_DIR: '/stale', SQLITE_PATH: '/stale' });
  assert.equal(env.MOJULO_HOST, 'chatgpt');
  assert.equal(env.MOJULO_SURFACE, 'box');
  assert.equal(env.MOJULO_DISTRIBUTION, 'npm');
  assert.equal(env.MOJULO_HOME, path.join(workspace, '.mojulo-chatgpt/home'));
  for (const key of ['SQLITE_PATH','STORAGE_ROOT','MOJULO_DATA_DIR','MOJULO_OUTCOMES_DIR','MOJULO_EXPORTS_DIR']) {
    assert.ok(env[key].startsWith(path.join(workspace, '.mojulo-chatgpt/home/')), key);
  }
});

test('a mismatched managed installation is never overwritten by install', (t) => {
  const workspace = scratch(t);
  const loc = locations(parseArgs(['status', '--workspace', workspace]));
  fs.mkdirSync(loc.packageRoot, { recursive: true });
  fs.writeFileSync(path.join(loc.packageRoot, 'package.json'), JSON.stringify({ name: 'mojulo', version: '3.0.0' }));
  assert.equal(status(parseArgs(['status', '--workspace', workspace])).ok, false);
  let spawned = false;
  assert.throws(() => install(parseArgs(['install', '--workspace', workspace]), () => { spawned = true; }), /different or unrecorded runtime/);
  assert.equal(spawned, false);
  assert.equal(JSON.parse(fs.readFileSync(path.join(loc.packageRoot, 'package.json'))).version, '3.0.0');
});

test('checkpoint reading verifies recipe digest and requested exact version', (t) => {
  const workspace = scratch(t);
  const file = path.join(workspace, 'capsule.json');
  const manifest = { kind: 'floorplan', seed: 91 };
  const sha = createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
  const capsule = {
    format: 'mojulo-chatgpt-recipe-v1',
    mojulo: { version: '3.1.0', source: { kind: 'npm', spec: 'mojulo@3.1.0' } },
    manifestSha256: sha,
    restore: { title: 'Test', ref: 'sk_mojulo_ci', manifest }
  };
  fs.writeFileSync(file, JSON.stringify(capsule));
  const opts = parseArgs(['restore', '--workspace', workspace, '--capsule', file]);
  assert.deepEqual(readCapsule(opts), capsule.restore);
  assert.throws(() => readCapsule({ ...opts, version: '3.0.0' }), /Capsule needs Mojulo 3.1.0/);
  capsule.restore.manifest.seed = 92;
  fs.writeFileSync(file, JSON.stringify(capsule));
  assert.throws(() => readCapsule(opts), /hash mismatch/);
});
