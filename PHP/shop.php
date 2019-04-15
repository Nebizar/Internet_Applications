<?php 
	session_start(); 
	$db = new mysqli("localhost", "root", "", "produkty");
?>
<!DOCTYPE html>
<html>

<head>
    <title>Password Shop</title>
    <link rel="stylesheet" type="text/css" href="style.css" title="CSS file">
    <script src="jquery-3.3.1.min.js"></script>
    <script type="text/javascript">
	//wiazanie zmiennych i transakcje TODO
        var inCart = {};
		var price = 0;
        function addToCart(x) {
            let row = $(x).parent().parent();
            let item = $(row).children('td.item').text();
			//console.log(item);
			let priceL = $(row).children('td.price').text();
			//console.log(priceL);
            if (!inCart[item]) {
                inCart[item] = true;
                let cart = $('#cart .items');
                let tb = $('#cart .items').html();
				//console.log(priceL);
				price += parseInt(priceL);
				//console.log(price);
                $(cart).html(tb + '<tr><td><input type="hidden" name="item[]" value="' + item + '">' + item + '</td></tr>');
            }
			$('.value').text(price);
        }
		function setChecker(){
			$('.checker').val("1")
		}
        function clearCart() {
            $('#cart .items').html('');
            Object.keys(inCart).forEach(function(key, index) {
                inCart[key] = false;
            });
			price = 0;
			$('.value').text(price);
			$('.checker').val("0")
            //$('.clear').one('click', clearCart);
        }
        
    </script>
</head>
<body>
    <h1>Password Shop</h1>
    <table>
		<tr><td>Nazwa</td><td>Cena</td></tr>
        <?php
        if (!$db) { ?>
            <?= "Connect failed: " . mysqli_connect_error() . "\n"; ?>
            <?php
            exit();
        }
        $result = $db->query("select * from przedmioty");
        foreach ($result as $r) : ?>
            <tr>
                <td class="item"><?= $r["nazwa"] ?></td><td class="price"><?= $r["cena"] ?></td>
                <td><button class="addtocart" onClick="addToCart(this)">Add to cart</button></td>
            </tr>
        <?php endforeach;?>
    </table>
    <form action="shop.php" id="cart" method="post">
            <div class="button">CART</div>
            <table class="items"></table>
			<p class="value"> 0 </p>
            <input type="hidden" class="checker" name="buyingCheck"/>
            <input type="submit" class="buy" name="buy" onClick="setChecker()" value="Buy">
            <button class="clear" onClick = "clearCart()">Clear</button> 

    </form>
    <?php
	if ($_POST['buyingCheck']=='1') {
		$rowCount = count($_POST['item']);
		$check = 0;
		$db->begin_transaction();
		$q = $db->prepare("delete from przedmioty where nazwa like ?");
		for ($i = 0; $i < $rowCount; $i++) {
			$q -> bind_param("s",$_POST['item'][$i]);
			$q->execute();
			if( $db->affected_rows != 1){
				$check = 1;
			}
			//$db->query("delete from przedmioty where nazwa like '".$_POST['item'][$i]."';");
		}
		if($check == 1){
			$db->rollback();
		}
		else{
			$db->commit();
		}
		session_unset();
		session_destroy();
		header("Refresh:0");
	}
	?>
</body>
</html>