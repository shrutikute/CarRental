var CarRental = (function () {
    var cars = [
        {
            type: 'compact',
            price: 29.99,
            insurance: 17
        },
        {
            type: 'midsize',
            price: 39.99,
            insurance: 22
        },
        {
            type: 'luxury',
            price: 49.99,
            insurance: 28
        }
    ];
    var getCar = function (type) {
        var carObj = $(cars).map(function (i, car) {
            if (car.type === type) {
                return car;
            }
        });
        return carObj[0];
    };
    return {
        getRate: function (city) {
            switch (city) {
                case 'sfo':
                    return 15;
                    break;
                case 'la':
                    return 15;
                    break;
                case 'az':
                    return 10;
                    break;
                default:
                    break;
            }
        },
        getCarObject: function (type) {
            return getCar(type);
        }
    };
})();
// A $( document ).ready() block.
$(document).ready(function () {
    window.myRental = {};
    $("#ddlVehicleType").change(function () {
        var carType = $("#ddlVehicleType :selected").val();
        myRental.car = CarRental.getCarObject(carType);
    });

    $("#ddlPickUpLocation").change(function () {
        var cityRate = $("#ddlPickUpLocation :selected").val();
        myRental.cityRate = CarRental.getRate(cityRate);
    });
    $("#coll-inssu").change(function () {
        $("#insu-rate").text(myRental.car.insurance);
    });
    $("#giftcard").change(function () {
        $("#giftcardtext").text("100");
    });
    $("#btnContinue").click(function () {
        var numDays = (new Date($("#DroppOffDate").val()) - new Date($("#PickUpDate").val())) / (1000 * 60 * 60 * 24);
        var tot = (myRental.cityRate / 100) * (myRental.car.price * numDays) + (myRental.car.price * numDays);
        if ($("#coll-inssu").is(':checked')) {
            tot = tot + numDays * myRental.car.insurance;
        }
        if ($("#giftcard").is(':checked')) {
            tot = tot + 100;
        }

        document.getElementById("result").innerHTML = '<span>Your total rental charges will be: ' + parseFloat(tot).toFixed(2);
        $("#result").show();
    });


});
