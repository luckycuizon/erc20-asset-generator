var web3,
    provider,
    isMainNetwork,
    isRopsten,
    isRinkeby,
    isGoerli,
    isMetaMaskLocked,
    address,
    tokenAddress;

// abi of StandardToken.sol
var abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address[]"
            },
            {
                "name": "_addedValue",
                "type": "uint256[]"
            }
        ],
        "name": "multiIncreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_recipient",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address[]"
            },
            {
                "name": "_value",
                "type": "uint256[]"
            }
        ],
        "name": "multiApprove",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "standard",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address[]"
            },
            {
                "name": "_subtractedValue",
                "type": "uint256[]"
            }
        ],
        "name": "multiDecreaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
        ],
        "name": "approveAndCall",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseApproval",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "name": "tokenName",
                "type": "string"
            },
            {
                "name": "decimalUnits",
                "type": "uint8"
            },
            {
                "name": "tokenSymbol",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

// bytecode of StandardToken.sol
var bytecode = '60806040526040805190810160405280600581526020017f4552433230000000000000000000000000000000000000000000000000000000815250600290805190602001906200005192919062000184565b503480156200005f57600080fd5b50604051620025443803806200254483398101806040528101908080519060200190929190805182019291906020018051906020019092919080518201929190505050836000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360068190555082600390805190602001906200010492919062000184565b5080600490805190602001906200011d92919062000184565b5081600560006101000a81548160ff021916908360ff16021790555033600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505062000233565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001c757805160ff1916838001178555620001f8565b82800160010185558215620001f8579182015b82811115620001f7578251825591602001919060010190620001da565b5b5090506200020791906200020b565b5090565b6200023091905b808211156200022c57600081600090555060010162000212565b5090565b90565b61230180620002436000396000f300608060405260043610610107576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063035f057d1461010c57806306fdde03146101cd578063095ea7b31461025d57806318160ddd146102c257806323b872dd146102ed578063313ce5671461037257806340c10f19146103a357806342966c68146103f057806350e8587e1461041d5780635a3b7e42146104de578063661884631461056e57806370a08231146105d357806372a7b8ba1461062a5780638da5cb5b146106eb57806395d89b4114610742578063a9059cbb146107d2578063cae9ca5114610837578063d73dd623146108e2578063dd62ed3e14610947575b600080fd5b34801561011857600080fd5b506101b360048036038101908080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506109be565b604051808215151515815260200191505060405180910390f35b3480156101d957600080fd5b506101e2610c5b565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610222578082015181840152602081019050610207565b50505050905090810190601f16801561024f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561026957600080fd5b506102a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610cf9565b604051808215151515815260200191505060405180910390f35b3480156102ce57600080fd5b506102d7610deb565b6040518082815260200191505060405180910390f35b3480156102f957600080fd5b50610358600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610df1565b604051808215151515815260200191505060405180910390f35b34801561037e57600080fd5b506103876111ab565b604051808260ff1660ff16815260200191505060405180910390f35b3480156103af57600080fd5b506103ee600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506111be565b005b3480156103fc57600080fd5b5061041b600480360381019080803590602001909291905050506112b6565b005b34801561042957600080fd5b506104c46004803603810190808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919291929080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050611361565b604051808215151515815260200191505060405180910390f35b3480156104ea57600080fd5b506104f36114dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610533578082015181840152602081019050610518565b50505050905090810190601f1680156105605780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561057a57600080fd5b506105b9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061157b565b604051808215151515815260200191505060405180910390f35b3480156105df57600080fd5b50610614600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061180c565b6040518082815260200191505060405180910390f35b34801561063657600080fd5b506106d16004803603810190808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919291929080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509192919290505050611854565b604051808215151515815260200191505060405180910390f35b3480156106f757600080fd5b50610700611bb5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561074e57600080fd5b50610757611bdb565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561079757808201518184015260208101905061077c565b50505050905090810190601f1680156107c45780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156107de57600080fd5b5061081d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611c79565b604051808215151515815260200191505060405180910390f35b34801561084357600080fd5b506108c8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050611e98565b604051808215151515815260200191505060405180910390f35b3480156108ee57600080fd5b5061092d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061201b565b604051808215151515815260200191505060405180910390f35b34801561095357600080fd5b506109a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612217565b6040518082815260200191505060405180910390f35b600080825184511415156109d157600080fd5b600090505b835181111515610c5057610a9d83828151811015156109f157fe5b90602001906020020151600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008785815181101515610a4a57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461229e90919063ffffffff16565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008684815181101515610aec57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508381815181101515610b4257fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008886815181101515610be957fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a380806001019150506109d6565b600191505092915050565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610cf15780601f10610cc657610100808354040283529160200191610cf1565b820191906000526020600020905b815481529060010190602001808311610cd457829003601f168201915b505050505081565b600081600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60065481565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610e2e57600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610e7b57600080fd5b600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610f0657600080fd5b610f57826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546122bc90919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610fea826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461229e90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506110bb82600860008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546122bc90919063ffffffff16565b600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600560009054906101000a900460ff1681565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561121a57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561125657600080fd5b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550806006600082825401925050819055505050565b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411151561130257600080fd5b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508060066000828254039250508190555050565b6000808251845114151561137457600080fd5b600090505b8351811115156114d257828181518110151561139157fe5b90602001906020020151600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086848151811015156113ea57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550838181518110151561144057fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92585848151811015156114a657fe5b906020019060200201516040518082815260200191505060405180910390a38080600101915050611379565b600191505092915050565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156115735780601f1061154857610100808354040283529160200191611573565b820191906000526020600020905b81548152906001019060200180831161155657829003601f168201915b505050505081565b600080600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083111561168c576000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611720565b61169f83826122bc90919063ffffffff16565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008060008351855114151561186957600080fd5b600091505b845182111515611ba957600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600086848151811015156118c757fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080848381518110151561191d57fe5b9060200190602002015111156119cb576000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000878581518110151561197e57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611a8d565b6119f584838151811015156119dc57fe5b90602001906020020151826122bc90919063ffffffff16565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008785815181101515611a4457fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8482815181101515611a9b57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008987815181101515611b4257fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3818060010192505061186e565b60019250505092915050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015611c715780601f10611c4657610100808354040283529160200191611c71565b820191906000526020600020905b815481529060010190602001808311611c5457829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515611cb657600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515611d0357600080fd5b611d54826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546122bc90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611de7826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461229e90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080849050611ea88585610cf9565b15612012578073ffffffffffffffffffffffffffffffffffffffff16638f4ffcb1338630876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b83811015611fa2578082015181840152602081019050611f87565b50505050905090810190601f168015611fcf5780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b158015611ff157600080fd5b505af1158015612005573d6000803e3d6000fd5b5050505060019150612013565b5b509392505050565b60006120ac82600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461229e90919063ffffffff16565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60008082840190508381101515156122b257fe5b8091505092915050565b60008282111515156122ca57fe5b8183039050929150505600a165627a7a72305820aa1195e16fc806f25d0f60cfd7d2a0150c0d8b67d9d11e9a21510d88078646ee0029';

var metamaskStatus = $('#metamask-status');
var accountAddress = $('#current-address');
var currentNetwork = $('#current-network');
var metamaskLocked = $('#metamask-locked');
var metamaskUnlocked = $('#metamask-unlocked');

var firstFetchTokensList = true;

var tokenInteractive = $('#token-interactive');
tokenInteractive.hide();

var assetForm = $('#asset-form');
var assetFormInput = $('#asset-form :input');

var mintForm = $('#mint-form');
var mintFormInput = $('#mint-form :input');

var transferForm = $('#transfer-form');
var transferFormInput = $('#transfer-form :input');

var burnForm = $('#burn-form');
var burnFormInput = $('#burn-form :input');

//disable all form input fields
assetFormInput.prop("disabled", true);

window.addEventListener('load', async () => {
    // New ethereum provider
    if (window.ethereum) {
        console.log("New ethereum provider detected");
        // Instance web3 with the provided information
        web3 = new Web3(window.ethereum);
        // ask user for permission
        metamaskStatus
            .html('Please allow MetaMask to view your addresses')
            .css({
                "text-align": "center",
                "color": "#0000ff"
            })
            .show();
        window.ethereum.enable().then(function (abc) {
            // user approved permission
            console.log("abc ===>", abc)
            start()
        }).catch(function (error) {
            metamaskStatus.css({ "color": "#ff0000" })
            // user rejected permission
            if (error.code == 4001) {
                metamaskStatus.html('You reject the permission request, Please refresh to try again');
                console.log("User rejected the permission request.");
            } else if (error.code == -32002) {
                metamaskStatus.html("Metamask permission request is already pending</br>Open Metamask to allow")
                    .css({ "color": "#ffa500" });
            } else {
                metamaskStatus.html(error.message);
                console.error("Error while try to connect with Metamask", error);
            }
        });
    }
    // Old web3 provider
    else if (web3 && Object.keys(web3).length) {
        console.log("Old web3 provider detected");
        start()
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected || web3 not exits');
        metamaskStatus.html('You do not appear to be connected to any Ethereum network. To use this service and deploy your contract, we recommend using the <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">MetaMask</a> plugin for Google Chrome, which allows your web browser to connect to an Ethereum network.').show();
    }
});

function handleAccountsChanged(accounts) {
    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
    window.location.reload();
}

function handleChainChanged(_chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
}

function metamaskEvents() {
    ethereum.on('accountsChanged', handleAccountsChanged)
        .on('chainChanged', handleChainChanged)
        .on('connect', function (a, b, c) {
            debugger;
        })
        .on('disconnect', function (a, b, c) {
            debugger;
        })
        .on('message', function (a, b, c) {
            debugger;
        });
}

function renderTokenInteractive(newTokenAddress, isInit = true) {
    console.log("newTokenAddress: ", newTokenAddress)
    tokenInteractive.show();
    tokenAddress = newTokenAddress;
    tokenAddressText.innerHTML = `<b>${newTokenAddress}</b>`;
    currentSelectedToken.innerHTML = newTokenAddress;
}

function getTokensList() {
    tokensList.innerHTML = `Loading you tokens ...`;
    fetch(`https://api.airtable.com/v0/appp5YUzsfGiQBc1B/Token?api_key=keyKkffIj6L6UPlR0&filterByFormula={Owner}=%22${address.toLowerCase()}%22`)
        .then((response) => response.json())
        .then((data) => {
            if(data.records.length === 0) return tokensList.innerHTML = 'No token created';
            const tokensListAirtable = data.records.map(item => item['fields']['Token']);

            let tokensHtmlText = `
            <div class="dropdown">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span id="currentSelectedToken">${tokenAddress ? tokenAddress.toLowerCase() : 'Select token interactive'}</span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">  
            `;
            tokensListAirtable.forEach(token => tokensHtmlText += `<button onClick="renderTokenInteractive('${token}', true)" class="dropdown-item ${tokenAddress && tokenAddress.toLowerCase() === token ? 'active' : ''}">${token}</button>`);
            tokensHtmlText += `</div>
            </div>`;

            tokensList.innerHTML = tokensHtmlText;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function saveToken(token) {
    fetch('https://api.airtable.com/v0/appp5YUzsfGiQBc1B/Token?api_key=keyKkffIj6L6UPlR0', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "records": [{
                    "fields": {
                        "Token": token.toLowerCase(),
                        "Owner": address.toLowerCase()
                    }
                }]
            }),
    })
    .then((response) => response.json())
    .then((data) => {
        getTokensList();
        renderTokenInteractive(token, false);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function start() {
    provider = web3.currentProvider;
    assetFormInput.prop("disabled", false);
    metamaskStatus.hide()
    metamaskEvents()
    getEthNetworkId()
        .then(function (networkId) {
            if (networkId === '1') {
                isMainNetwork = true;
                currentNetwork.text('You are currently at Mainnet').show();
            } else if (networkId === '3') {
                isRopsten = true;
                currentNetwork.text('Your are currently at Ropsten testnet.').show();
            } else if (networkId === '4') {
                isRinkeby = true;
                currentNetwork.text('Your are currently at Rinkeby testnet.').show();
            } else if (networkId === '5') {
                isGoerli = true;
                currentNetwork.text('Your are currently at Goerli testnet.').show();
            } else
                currentNetwork.text('Your current network id is ' + networkId).show();
        })
        .fail(function (err) {
            console.log(err)
        });

    setInterval(function () {
        isLocked()
            .then(function (isLocked) {
                if (isLocked) {
                    isMetaMaskLocked = true;
                    metamaskUnlocked.hide();
                    accountAddress.hide();
                    metamaskLocked.show();
                    assetFormInput.prop("disabled", true);
                    throw Error("Metamask Locked");
                }
                metamaskUnlocked.show();
                metamaskLocked.hide();

                return getAccount()
            })
            .then(function (account) {
                if (account.length > 0) {
                    if (isMetaMaskLocked) {
                        isMetaMaskLocked = false;
                        assetFormInput.prop("disabled", false);
                    }
                    address = account[0];
                    return getBalance(account[0]);
                }
            })
            .then(function (balance) {
                accountAddress.html('<strong>Selected Account: ' + address + ' (' + balance + ' eth)</strong>').show();
                if(firstFetchTokensList) {
                    getTokensList();
                    firstFetchTokensList = false;
                };
            })
            .fail(function (err) {
                if (err.message !== "Metamask Locked")
                    console.log(err)
            });
    }, 1000);

    const searchParams = new URLSearchParams(window.location.search);
    const tokenAddressParam = searchParams.get('tokenAddress');
    if(tokenAddressParam) renderTokenInteractive(tokenAddressParam, true);
}

function sendSync(params) {
    var defer = $.Deferred();
    provider.sendAsync(params, function (err, result) {
        if (err)
            return defer.reject(err.json());
        if (result['error'])
            return defer.reject(result['error']);
        defer.resolve(result)
    }
    );
    return defer.promise();
}

function getEthNetworkId() {
    return sendSync({ method: 'net_version', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err
        })
}

function requestAccounts() {
    return sendSync({ method: 'eth_requestAccounts' })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getAccount() {
    return sendSync({ method: 'eth_accounts', params: [] })
        .then(function (result) {
            return result['result'];
        })
        .fail(function (err) {
            return err;
        })
}

function getBalance(address) {
    return sendSync({ method: 'eth_getBalance', params: [address] })
        .then(function (result) {
            return web3.utils.fromWei(result['result']);
        })
        .fail(function (err) {
            return err;
        })
}

function isLocked() {
    return getAccount()
        .then(function (accounts) {
            return accounts.length <= 0;
        })
        .fail(function (err) {
            return err
        });
}

//call function on form submit
assetForm.submit(function (e) {

    //prevent the form from actually submitting.
    e.preventDefault();

    var initialSupply = $('#total-supply').val();
    var tokenName = $('#name').val();
    var decimalUnits = $('#decimals').val();
    var tokenSymbol = $('#symbol').val();


    if (tokenName === '') {
        alert('name can\'t be blank')
    } else if (tokenSymbol === '') {
        alert('symbol can\'t be blank')
    } else if (decimalUnits === '') {
        alert('decimals can\'t be blank')
    } else if (initialSupply === '') {
        alert('totalSupply can\'t be blank')
    } else {
        //disable all form input fields
        assetFormInput.prop("disabled", true);
        statusText.innerHTML = 'Waiting for contract to be deployed...';
        assetLoading.innerHTML = '<div class="loader"></div>';
        var standardtokenContract = new web3.eth.Contract(abi);
        standardtokenContract.deploy({
            data: '0x' + bytecode,
            arguments: [initialSupply, tokenName, decimalUnits, tokenSymbol]
        }).send({
            from: address
        }, function (error, transactionHash) {
            if (error) {
                console.error(error);
                assetFormInput.prop("disabled", false);
                return;
            }
            console.log('Transaction Hash :', transactionHash);
            if (isMainNetwork) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12).<br> <strong>Transaction hash: </strong><br> <a href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isRopsten) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong>Transaction hash: </strong><br> <a href="https://ropsten.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isRinkeby) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong> Transaction hash: </strong><br> <a href="https://rinkeby.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else if (isGoerli) {
                statusText.innerHTML = '<p align="center">Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). <br> <strong> Transaction hash: </strong><br> <a href="https://goerli.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a></p>'
            } else
                statusText.innerHTML = 'Contract deployment is in progress - please be patient. If nothing happens for a while check if there\'s any errors in the console (hit F12). Transaction hash: ' + transactionHash
        }).on('confirmation', function () {
            return;
        }).then(function (newContractInstance) {
            if (!newContractInstance.options.address) {
                console.log(newContractInstance);
                return;
            }
            console.log('Deployed Contract Address : ', newContractInstance.options.address);
            var newContractAddress = newContractInstance.options.address;
           
            if (isMainNetwork) {
                statusText.innerHTML = 'Transaction  mined! Please check "Your token list". Contract address: <a href="https://etherscan.io/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isRopsten) {
                statusText.innerHTML = 'Transaction  mined! Please check "Your token list". Contract address: <a href="https://ropsten.etherscan.io/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isRinkeby) {
                statusText.innerHTML = 'Transaction  mined! Please check "Your token list". Contract address: <a href="https://rinkeby.etherscan.io/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else if (isGoerli) {
                statusText.innerHTML = 'Transaction  mined! Please check "Your token list". Contract address: <a href="https://goerli.etherscan.io/token/' + newContractAddress + '" target="_blank">' + newContractAddress + '</a>'
            } else
                statusText.innerHTML = 'Please check "Your token list". Contract deployed at address <b>' + newContractAddress + '</b> - keep a record of this.'
            saveToken(newContractAddress);
            assetLoading.innerHTML = '';
        }).catch(function (error) {
            console.error(error);
            assetFormInput.prop("disabled", false);
            assetLoading.innerHTML = '';
        })
    }
});

function nthRoot(x, n) {
    if (x < 0 && n % 2 != 1) return NaN; // Not well defined
    return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1 / n);
}

$("#decimals").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#decimals-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    }
});

$("#total-supply").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#total-supply-error-msg").html("Digits Only").show().fadeOut("slow");
        return false;
    } else {
        //TODO:show token total supply will be on bottom of total supply input
        // $("#total-supply").keyup(function (e) {
        //     if ($("#decimals").val() && $('#total-supply').val()) {
        //         console.log(Math.trunc($('#total-supply').val() / Math.pow(10, $("#decimals").val()))
        //     }
        // })
    }
});

function getTransactionHashText(transactionHash) {
    if (isMainNetwork) {
        return '<strong>Please wait a while... Transaction hash: </strong><br> <a href="https://etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
    } else if (isRopsten) {
        return '<strong>Please wait a while... Transaction hash: </strong><br> <a href="https://ropsten.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
    } else if (isRinkeby) {
        return '<strong>Please wait a while... Transaction hash: </strong><br> <a href="https://rinkeby.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
    } else if (isGoerli) {
        return '<strong>Please wait a while... Transaction hash: </strong><br> <a href="https://goerli.etherscan.io/tx/' + transactionHash + '" target="_blank">' + transactionHash + '</a>'
    } else return '<strong>Please wait a while... Transaction hash: </strong>' + transactionHash
}


mintForm.submit(function (e) {
    e.preventDefault();
    var recipient = $('#mint-recipient').val();
    var amount = $('#mint-amount').val();
    if(!amount) alert('Amount can\'t be blank');
    else if(!recipient) alert('Recipient can\'t be blank');
    else {
        mintFormInput.prop("disabled", true);
        mintLoading.innerHTML = '<div class="loader"></div>';
        mintStatusText.innerHTML = 'Please confirm transaction ...';

        var tokenContract = new web3.eth.Contract(abi, tokenAddress);
        tokenContract.methods.mint(recipient, amount).send({
            from: address
        }, function (error, transactionHash) {
            if (error) {
                console.error(error);
                mintFormInput.prop("disabled", false);
                return;
            }
            mintStatusText.innerHTML = getTransactionHashText(transactionHash);
        }).on('confirmation', function () {
            return;
        }).then(function (data) {
            mintFormInput.prop("disabled", false);
            mintStatusText.innerHTML = 'Mint successfully!';
            mintLoading.innerHTML = '';
        }).catch(function (error) {
            console.error(error);
            mintFormInput.prop("disabled", false);
            mintLoading.innerHTML = '';
        });
        
    };
});

transferForm.submit(function (e) {
    e.preventDefault();
    var amount = $('#transfer-amount').val();
    var recipient = $('#transfer-recipient').val();
    if(!amount) alert('Amount can\'t be blank');
    else if(!recipient) alert('Recipient can\'t be blank');
    else {
        transferLoading.innerHTML = '<div class="loader"></div>';
        transferFormInput.prop("disabled", true);
        transferStatusText.innerHTML = 'Please confirm transaction ...';

        var tokenContract = new web3.eth.Contract(abi, tokenAddress);
        tokenContract.methods.transfer(recipient, amount).send({
            from: address
        }, function (error, transactionHash) {
            if (error) {
                console.error(error);
                transferFormInput.prop("disabled", false);
                return;
            }
            transferStatusText.innerHTML = getTransactionHashText(transactionHash);
        }).on('confirmation', function () {
            return;
        }).then(function (data) {
            transferFormInput.prop("disabled", false);
            transferLoading.innerHTML = '';
            transferStatusText.innerHTML = 'Transfer successfully!';
        }).catch(function (error) {
            console.error(error);
            transferFormInput.prop("disabled", false);
            transferLoading.innerHTML = '';
        });
       
    };
});


burnForm.submit(function (e) {
    e.preventDefault();
    var amount = $('#burn-amount').val();
    if(!amount) alert('Amount can\'t be blank');
    else {
        burnFormInput.prop("disabled", true);
        burnLoading.innerHTML = '<div class="loader"></div>';
        burnStatusText.innerHTML = 'Please confirm transaction ...';

        var tokenContract = new web3.eth.Contract(abi, tokenAddress);
        tokenContract.methods.burn(amount).send({
            from: address
        }, function (error, transactionHash) {
            if (error) {
                console.error(error);
                burnFormInput.prop("disabled", false);
                return;
            }
            burnStatusText.innerHTML = getTransactionHashText(transactionHash);
        }).on('confirmation', function () {
            return;
        }).then(function (data) {
            burnFormInput.prop("disabled", false);
            burnStatusText.innerHTML = 'Burn successfully!';
            burnLoading.innerHTML = '';
        }).catch(function (error) {
            console.error(error);
            burnFormInput.prop("disabled", false);
            burnLoading.innerHTML = '';
        });;
    };
});