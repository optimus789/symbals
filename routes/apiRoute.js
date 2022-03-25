const router = require('express').Router();
const axios = require('axios');
const { ethers, Wallet, providers } = require('ethers');
const { connect } = require('@textile/tableland');
const fetch = require('node-fetch');
globalThis.fetch = fetch;
const contract_address = '0x873C456f308F91e47aC6284b9a785Ccf62ccC0b3';
const contractAbi = [
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'subscriptionId',
        type: 'uint64',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'have',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'want',
        type: 'address',
      },
    ],
    name: 'OnlyCoordinatorCanFulfill',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: 'randomWords',
        type: 'uint256[]',
      },
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requestRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 's_randomWords',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 's_requestId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
// Since we don't have Metamask, you need to supply a private key directly
let privKey = process.env.PRIV_KEY;
let privKey2 = process.env.PRIV_KEY2;
const wallet = new Wallet(privKey);
const wallet2 = new Wallet(privKey2);
const provider = new providers.AlchemyProvider(
  'rinkeby',
  process.env.ALCHEMY_KEY
);
const signer = wallet.connect(provider);
const chainLinkVRFSigner = wallet2.connect(provider);
let multTableRes, highTableRes;

router.route('/createMultiplierTable').get(async (req, res) => {
  const tbl = await connect({ network: 'testnet', signer });
  multTableRes = await tbl.create(
    `CREATE TABLE multiplierTable (address text, mult int, primary key (address));`
  );
  console.log(multTableRes);
});

router.route('/listTables').get(async (req, res) => {
  const tbl = await connect({ network: 'testnet', signer });
  const tables = await tbl.list();
  console.log(tables);
});

router.route('/createHighTable').get(async (req, res) => {
  const tbl = await connect({ network: 'testnet', signer });
  highTableRes = await tbl.create(
    `CREATE TABLE highBoard (address text, score int, primary key (address));`
  );
});

router.route('/updateMultiplier/:address/:level').get(async (req, res) => {
  try {
    const tbl = await connect({ network: 'testnet', signer });
    const address = req.params.address;
    let level = req.params.level;
    console.log(address, level);

    const queryableName = 'multipliertable_452';
    console.log(queryableName);

    const queryRes = await tbl.query(
      `SELECT * FROM ${queryableName} WHERE address = '${address}';`
    );
    console.log('before update', queryRes);
    if (queryRes?.data?.rows && queryRes.data.rows.length > 0) {
      const deleteRes = await tbl.query(
        `DELETE FROM ${queryableName} WHERE address = '${address}';`
      );
      console.log('delete result: ', deleteRes);
      //const updateRes = await tbl.query(`UPDATE ${queryableName} SET level = ${level} WHERE address = ${address};`);
    }

    // for (const [rowId, row] of Object.entries(rows)) {
    //   console.log(`row: ${rowId}`);
    //   for (const [colId, data] of Object.entries(row)) {
    //     const { name } = columns[colId];
    //     console.log(`  ${name}: ${data}`);
    //   }
    // }

    let contract = new ethers.Contract(
      contract_address,
      contractAbi,
      chainLinkVRFSigner
    );
    let transaction = await contract.requestRandomWords();
    let tx = await transaction.wait();
    console.log(tx);
	let transaction2 = await contract.s_requestId();

    let randomNum = String(parseInt(transaction2._hex));
    console.log(randomNum);

    // console.log(randomNum.length);
    console.log(randomNum[11]);
    console.log('This is level and randomNum', level, randomNum[11]);
    level = Number(level) + Number(randomNum[11]);
    queryToSend =
      `INSERT INTO ${queryableName} (address, mult) VALUES ('${address}', ` +
      level +
      `);`;
    const insertRes = await tbl.query(queryToSend);

    // const queryRes2 = await tbl.query(`SELECT * FROM ${queryableName};`);
    console.log('after insert', insertRes);
    res.send('Success');
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

router.route('/getMultiplier/:address').get(async (req, res) => {
  try {
    const tbl = await connect({ network: 'testnet', signer });
    const address = req.params.address;

    const queryableName = 'multipliertable_452';
    console.log(queryableName);
    const queryRes = await tbl.query(
      `SELECT * FROM ${queryableName} WHERE address = '${address}';`
    );
    if (queryRes.length !== 0) {
      res.send(queryRes);
    } else {
      res.send('Not Available');
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

router.route('/delMultiplier/:address').get(async (req, res) => {
  try {
    const tbl = await connect({ network: 'testnet', signer });
    const address = req.params.address;

    const queryableName = 'multipliertable_452';
    console.log(queryableName);
    const queryRes = await tbl.query(
      `DELETE FROM ${queryableName} WHERE address = '${address}';`
    );
    if (queryRes.length !== 0) {
      res.send(queryRes);
    } else {
      res.send('Not Available');
    }
  } catch (error) {
    console.log(error);
    res.send('Error');
  }
});

module.exports = router;
