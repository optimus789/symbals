const serverUrl = 'https://cp3fbum5pnui.usemoralis.com:2053/server';
const appId = 'hxq9qTQo1Og5QLtOk0LxodiEC9WnPuprd8aMw2fe';
Moralis.start({ serverUrl, appId });
const sequence = window['0xsequence'];
const ETHAuth = window['0xsequence/ethauth'];
const Proof = window['0xsequence/ethauth'];
const wallet = new sequence.Wallet('polygon');
$(document).ready(function () {
  const connect = async (authorize = false) => {
    const connectDetails = await wallet.connect({
      app: 'Symbals',
      authorize,
      // keepWalletOpened: true
    });

    console.warn('connectDetails', { connectDetails });
    console.log(
      'users signed connect proof to valid their account address:',
      connectDetails.proof
    );
  };

  $('#btn-login2').click(async function () {

    await connect(true);
    const address = await wallet.getAddress();
    console.log(address);
    console.log('wallet', wallet);
    const signer = await wallet.getSigner();
   
    // Encode the transfer of the NFT tokenId to recipient
    const recipientAddress = '0x594E50D46A6441E89125965D9aDB357902C1a7E5';
    const tokenId = '365283783225248940146';
    
    const erc721TokenAddress = '0xb2C8c173E6A44DcE16cFE0619bA6EDf66a07d8bB';
   
    const tx = {
      to: erc721TokenAddress,
      data: new ethers.utils.Interface(contractAbi).encodeFunctionData('burn', [ address,
        recipientAddress,
        tokenId])
    }
    const txnResponse = await signer.sendTransaction(tx);
    console.log(txnResponse);

    // wait for the transaction to be mined
    await txnResponse.wait();
  });
  //   $('#btn-logout').click(async function () {
  //     await Moralis.User.logOut();
  //     $('#btn-login').show();
  //     $('#btn-logout').hide();
  //     console.log('logged out');
  //   });
});
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({
        signingMessage: 'Welcome to Symbals',
      });
      console.log(user.get('ethAddress'));
      $('#userId').val(user.get('ethAddress'));
      $('#btn-login').hide();
      $('#btn-logout').show();
      Moralis.enableWeb3();
    } catch (error) {
      console.log(error);
    }
  }
}

$(document).ready(function () {
  let user = Moralis.User.current();
  if (user) {
    Moralis.enableWeb3();

    $('#userId').val(user.get('ethAddress'));
    $('#btn-login').hide();
    $('#btn-logout').css('display', 'block');
  }
});

async function logOut() {
  await Moralis.User.logOut();
  $('#btn-login').show();
  $('#btn-logout').hide();
  console.log('logged out');
}

document.getElementById('btn-login').onclick = login;
document.getElementById('btn-logout').onclick = logOut;
