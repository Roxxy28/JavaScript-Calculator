var keys = document.querySelectorAll('#calculator span');
var calculating = document.querySelector('.calculating');
var results = document.querySelector('.results');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function (e) {
        var input = document.querySelector('.calculating');
        var results = document.querySelector('.results');
        var inputVal = results.innerHTML;
        var history = input.innerHTML;
        var keyValue = this.innerHTML;

        if (keyValue == 'AC') {
            input.innerHTML = '';
            results.innerHTML = '';
            decimalAdded = false;
        } else if (keyValue == '←') {
            if (history.length == 1) {
                input.innerHTML = '';
                results.innerHTML = '';
            }
            if (history.length >= 0) {
                history = history.substring(0, history.length - 1);
                input.innerHTML = history;
            }
            decimalAdded = false;
        } else if (keyValue == '=') {
            if (history) {
                var equation = history;
                var lastChar = equation[equation.length - 1];
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
                if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                    equation = equation.replace(/.$/, '');
                if (equation)
                    var evaulated = eval(equation);
                evaulated = evaulated.toPrecision(8);
                evaulated = Math.round(evaulated * 1000000000) / 1000000000;
                results.innerHTML = evaulated;
                input.innerHTML = evaulated
                decimalAdded = false;
            }

        } else if (operators.indexOf(keyValue) > -1) {
            var lastChar = history[history.length - 1];
            if (history != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += keyValue;
            else if (history == '' && keyValue == '-')
                input.innerHTML += keyValue;
            if (operators.indexOf(lastChar) > -1 && history.length > 1) {
                input.innerHTML = history.replace(/.$/, keyValue);
            }
            decimalAdded = false;
        } else if (keyValue == '.') {
            if (!decimalAdded) {
                input.innerHTML += keyValue;
                decimalAdded = true;
            }
        } else {
            input.innerHTML += keyValue;
        }
        e.preventDefault();
    }
};