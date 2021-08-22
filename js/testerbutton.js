

    function button1()
    {
      console.log(core_address);

       contract_presale.SetPresaleHandler.sendTransaction(core_address,{from:account},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Pre-sale owner added!');
         });  
       });

    }

    function button2()
    {


      contract_core.SetPresaleHandler.sendTransaction(presale_address,{from:account},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Core owner added!');
         });  
       });

    }

    function button3()
    {

      let value = web3.toWei(0.1,'ether');

      contract_presale.BuyPresalePackage.sendTransaction(0,'0x98B54604452425ecdEe870Eb25Fda24b6864C15B',{from:account,value: value},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Buy first Package!');
         });  
       });

    }



    function button4()
    {

      contract_presale.withdraw.sendTransaction({from:account},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Get Fund');
         });  
       });

    }


    function button5()
    {

      contract_presale.SetActive.sendTransaction(false,{from:account},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Stop');
         });  
       });

    }


    function button6()
    {

      let value = web3.toWei(0.2,'ether');

      contract_presale.AddNewPresalePackage.sendTransaction(1,value,{from:account},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Added');
         });  
       });

    }

    function button7()
    {

      let value = web3.toWei(1,'ether');

      contract_presale.BuyPresalePackage.sendTransaction(4,0,{from:account,value: value},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Buy first Package!');
         });  
       });

    }



    function button8()
    {

      contract_core.setURIBase.sendTransaction('https://rigcraft.io/token_api.php?token=',{from:account},function(err,ress)
       {
         waitForReceipt(ress, function() 
         {
           console.log('Buy first Package!');
         });  
       });

    }