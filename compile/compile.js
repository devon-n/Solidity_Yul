const path = require("path");
const fs = require("fs");
const solc = require("solc");

const outputPath = path.resolve(__dirname, "..", "build", "PureYul.bytecode.json");

const inputPath = path.resolve(__dirname, "..", "contracts", "PureYul.sol");

const source = fs.readFileSync(inputPath, "utf-8")

const input = {
    language: 'Yul',
    sources: {
        'PureYul.sol': {
            content: source
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['evm.bytecode']
            }
        }
    }
}

const compiled = solc.compile(JSON.stringify(input))
const bytecode = JSON.parse(compiled).contracts["PureYul.sol"].PureYul.evm.bytecode.object;

console.log(bytecode)
fs.writeFileSync(outputPath, JSON.stringify(bytecode))