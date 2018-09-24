function Pessoa(nome, telefone, endereco) {

	this.nome = nome;

	this.telefone = telefone;

	this.endereco = endereco;
	
	this.getNome = function() {
		return this.nome;
	}

	this.getTelefone = function() {
		return this.telefone;
	}

	this.getEndereco = function() {
		return this.endereco;
	}

}

function fakeRequest(pessoa) {
	alert(pessoa.nome + " cadastrado com sucesso!");
}

function isNomeCompleto(nome) {
	return nome.split(" ").length > 1;
}

function isNomeValido(nome) {
	var nomes = nome.split(" ");
	for (var index in nomes) {
		console.log(nomes[index]);
		if (nomes[index].length < 2) {
			return false;
		}
	}
	return true;
}

function isTelefoneValido(telefone) {
	var regex = /^\d{11}$/;
	return telefone.match(regex) != null;
}

function isEnderecoValido(endereco) {
	var partes = endereco.split(",");
	for (var index in partes) {
		if (partes[index].trim().length < 1) {
			return false;
		}
	}

	if (partes.length < 4) {
		return false;
	}
	return true;
}

app.controller("newProprietario", function($scope, $http) {
	
	$scope.submit = function(form) {
		
		if (!form.$valid) {
			alert("Por favor, preencha o formulário corretamente.");
			return false;
		}

		var pessoa = new Pessoa($scope.nome, $scope.telefone, $scope.endereco);
		$http.post("netProprietario.html").then(fakeRequest(pessoa));

		$scope.nome = undefined;
		$scope.telefone = undefined;
		$scope.endereco = undefined;

		form.nome.$setPristine();
		form.telefone.$setPristine();
		form.endereco.$setPristine();

		return true;

	}
});

app.controller("proprietarios", function($scope, $http) {

	$http.get("repository/pessoas.json")
		.then(function(response) {

			if (response.status == 200) {
				$scope.proprietarios = response.data;
			}
		}, function(response) {
			console.log(response);
			console.log(response.status + " - " + response.statusText +  " : " + response.data);
			alert("Problemas ao carregar a página. Tente novamente.");
		}
	);

	$scope.ordernarPor = function(campo) {
		$scope.minhaOrdenacao = campo;
	}
});

app.directive("rnTelefone", function() {
	return {
		require : 'ngModel',
		link : function (scope, element, attr, ngModel) {
			function validar(value) {
				ngModel.$setValidity('telefone',  isTelefoneValido(value));
				return value;
			}
			ngModel.$parsers.push(validar);
		}
	};
});

app.directive("rnDuaspalavras", function() {
	return {
		require : 'ngModel',
		link : function (scope, element, attr, ngModel) {
			function validar(value) {
				ngModel.$setValidity('telefone',  isNomeCompleto(value));
				return value;
			}
			ngModel.$parsers.push(validar);
		}
	};
});

app.directive("rnEndereco", function() {
	return {
		require : 'ngModel',
		link : function (scope, element, attr, ngModel) {
			function validar(value) {
				ngModel.$setValidity('telefone',  isEnderecoValido(value));
				return value;
			}
			ngModel.$parsers.push(validar);
		}
	};
});
