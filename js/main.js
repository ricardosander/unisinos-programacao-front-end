var app = angular.module("myApp",[]);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "file:///Users/ricardo/workspace/web/unisinos-programacao-front-end");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function isEmpty(value) {
	return value == undefined || value == null || value.trim().length == 0;
}

function validarDuasLetras(value) {
	if (isEmpty(value)) {
		return true;
	}
	return value.trim().length >= 2;
}

function validarDuasLetrasPorNome(value) {
	
	if (isEmpty(value)) {
		return true;
	}
	var values = value.trim().split(" ");
	if (values.length < 2) {
		return true;
	} 
	for (var index in values) {
		if (!validarDuasLetras(values[index])) {
			return false;
		}
	}
	return true;
}

app.directive("rnRequired", function() {
	return {
		require : 'ngModel',
		link : function (scope, element, attr, ngModel) {
			function validar(value) {
				ngModel.$setValidity('naoVazio', !isEmpty(value));
				return value;
			}
			ngModel.$parsers.push(validar);
		}
	};
});

app.directive("rnDuasletras", function() {
	return {
		require : 'ngModel',
		link : function (scope, element, attr, ngModel) {
			function validar(value) {
				ngModel.$setValidity('aoMenosDuasLetras', validarDuasLetras(value));
				return value;
			}
			ngModel.$parsers.push(validar);
		}
	};
});

app.directive("rnDuasletraspornome", function() {
	return {
		require : 'ngModel',
		link : function (scope, element, attr, ngModel) {
			function validar(value) {
				ngModel.$setValidity('aoMenosDuasLetrasPorNome',  validarDuasLetrasPorNome(value));
				return value;
			}
			ngModel.$parsers.push(validar);
		}
	};
});