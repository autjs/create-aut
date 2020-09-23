const path = require('path')
const fs = require('fs')
const shell = require('child_process')

const githubproject = 'https://github.com/autjs/hello-aut'

let projectPath = process.cwd()

if(!process.argv[2]) {
    log(`                                   `)
    log(`                                   `)
    log(`   第一步  您应该先创建一个项目      `)
    log(`                                   `)
    log(`       npx create-aut <project>          `)
    log(`                                   `)
    log(`   第二步  进入项目并安装依赖        `)
    log(`                                   `)
    log(`       cd <project> && npm install `)
    log(`                                   `)
    log(`   第三步  启动项目查看是否成功       `)
    log(`                                   `)
    log(`       npm run start               `)
    log(`                                   `)
    log(`   第四步  在需要打包的时候执行      `)
    log(`                                   `)
    log(`       npm run build               `)
    log(`                                   `)
    log(`   如果任何问题，可联系作者          `)
    log(`                                   `)
    log(`       cn.coder@tom.com            `)
    log(`                                   `)
    log(`   如果您想更快联系到作者(微信/手机)  `)
    log(`                                   `)
    log(`       15011021101                 `)
    log(`                                   `)
}else {
    createProject(path.resolve(projectPath,process.argv[2]))
}


function createProject(projectPath) {
    fs.exists(projectPath, function(exist) {
        if(exist) {
            log('目录已存在')
        }else {
            log(`   创建中，请稍等...`)
            exec(`git clone ${githubproject} ${projectPath}`)
            .then(function() {
                deleteFolderRecursive(`${projectPath}\\.git`)
                log(` 创建完成`)
            })
            .catch(function(err) {
                log(err)
            })
        }
    })
}


function exec(cmd) {
    return new Promise(function(resolve, reject) {
        shell.exec(cmd, function(err, stdout, stderr) {
            if(err) {
                reject(err)
            }else {
                log(stdout)
                resolve()
            }
        })
    })
}

function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function log(str) {
    console.log(str)
}