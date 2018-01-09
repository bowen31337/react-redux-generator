import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'

const copyPlugin = function (options) {
    return {
        ongenerate(){
            const targDir = path.dirname(options.targ)
            if (!fs.existsSync(targDir)){
                mkdirp(targDir,  err => {
								    if (err) console.error(err)
								})
            }
            fs.writeFileSync(options.targ, fs.readFileSync(options.src))
        }
    };

}

export default copyPlugin
