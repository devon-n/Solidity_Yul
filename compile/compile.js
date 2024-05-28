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

fs.writeFileSync(outputPath, JSON.stringify(bytecode))


// =================================================================================================

const { compileERC1155YulContract } = require("./helper_compile_erc1155Yul");
const { compileNoReceiver } = require("./helper_compile_noreceiver");
const { compileReceiver } = require("./helper_compile_receiver");

const erc1155Path = path.resolve(__dirname, '../', 'contracts', 'ERC1155Yul.sol');
const source1155 = fs.readFileSync(erc1155Path, 'utf-8');

var input1155 = {
    language: 'Yul',
    sources: {
        'ERC1155Yul.sol': {
            content: source1155
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ["evm.bytecode"]
            }
        }
    }
};

compileERC1155YulContract(input1155);

// =================================================================================================

const noreceiverPath = path.resolve(__dirname, '../', 'contracts', 'mocks', 'NoReceiver.sol');
const sourceNoReceiver = fs.readFileSync(noreceiverPath, 'utf-8');

var inputNoReceiver = {
    language: 'Solidity',
    sources: {
        'NoReceiver.sol': {
            content: sourceNoReceiver
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ["*"]
            }
        }
    }
};

compileNoReceiver(inputNoReceiver);

// =================================================================================================

const receiverPath = path.resolve(__dirname, '../', 'contracts', 'mocks', 'Receiver.sol');
const sourceReceiver = fs.readFileSync(receiverPath, 'utf-8');

var inputReceiver = {
    language: 'Solidity',
    sources: {
        'Receiver.sol': {
            content: sourceReceiver
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ["*"]
            }
        }
    }
};

compileReceiver(inputReceiver);