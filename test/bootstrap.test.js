import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const bootstrap = resolve('work-plugin/skills/mojulo/scripts/bootstrap.sh');
test('latest selection, offline reuse, explicit upgrade and exact recovery', () => {
  const root = mkdtempSync(join(tmpdir(), 'mojulo-bootstrap-'));
  try {
    const bin = join(root, 'bin'), workspace = join(root, "workspace ' $ literal");
    mkdirSync(bin);
    writeFileSync(join(bin, 'npm'), `#!/usr/bin/env node
const fs=require('fs'),path=require('path');
fs.appendFileSync(process.env.CALL_LOG,process.argv.slice(2).join(' ')+'\\n');
if(process.argv[2]==='view'){
 if(process.env.REGISTRY_FAIL)process.exit(1);
 process.stdout.write(JSON.stringify(process.env.TEST_LATEST));
}else if(process.argv[2]==='install'){
 const args=process.argv.slice(2), prefix=args[args.indexOf('--prefix')+1];
 const version=args.at(-1).slice('mojulo@'.length);
 const bin=path.join(prefix,'node_modules/.bin');fs.mkdirSync(bin,{recursive:true});
 fs.writeFileSync(path.join(bin,'mojulo'),'#!/usr/bin/env node\\nconsole.log('+JSON.stringify('mojulo '+version)+')\\n',{mode:0o755});
}else process.exit(2);
`, {mode:0o755});
    const env = {...process.env, PATH:bin+':'+process.env.PATH, CALL_LOG:join(root,'calls'), TEST_LATEST:'3.1.1'};
    const run = (args=[], extra={}) => spawnSync('bash',[bootstrap,workspace,...args],{env:{...env,...extra},encoding:'utf8'});
    const record = () => JSON.parse(readFileSync(join(workspace,'.mojulo-runtime/mojulo-version.json')));
    let result=run(); assert.equal(result.status,0,result.stderr); assert.equal(record().version,'3.1.1');
    const calls=readFileSync(env.CALL_LOG,'utf8');
    result=run([], {REGISTRY_FAIL:'1',TEST_LATEST:'4.0.0'});assert.equal(result.status,0,result.stderr);
    assert.equal(readFileSync(env.CALL_LOG,'utf8'),calls,'reuse must not access registry');
    result=spawnSync(join(workspace,'.mojulo-runtime/bin/mojulo-work'),['--version'],{encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);assert.equal(result.stdout.trim(),'mojulo 3.1.1');
    result=run(['--upgrade'],{TEST_LATEST:'4.0.0'});assert.equal(result.status,0,result.stderr);assert.equal(record().version,'4.0.0');
    result=run(['--version','3.1.1'],{REGISTRY_FAIL:'1'});assert.equal(result.status,0,result.stderr);assert.equal(record().version,'3.1.1');
    const before=readFileSync(env.CALL_LOG,'utf8');
    result=run(['--version','latest']);assert.notEqual(result.status,0);assert.equal(readFileSync(env.CALL_LOG,'utf8'),before);
    result=run(['--upgrade'],{REGISTRY_FAIL:'1'});assert.notEqual(result.status,0);assert.equal(record().version,'3.1.1');
    result=run(['--upgrade'],{TEST_LATEST:'not-a-version'});assert.notEqual(result.status,0);assert.equal(record().version,'3.1.1');
  } finally {rmSync(root,{recursive:true,force:true});}
});
