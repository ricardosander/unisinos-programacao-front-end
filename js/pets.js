var especies = [
	{
		valor : "cao", 
		nome : "Cão"
	},
	{
		valor : "gato", 
		nome : "Gato"
	},
];

function Pet(nome, especie, raca, proprietario) {

	this.nome = nome;

	this.especie = especie;

	this.raca = raca;

	this.proprietario = proprietario;
	
	this.getNome = function() {
		return nome;
	}

	this.getEspecie = function() {
		return especie;
	}

	this.getRaca = function() {
		return raca;
	}

	this.getProprietario = function() {
		return proprietario;
	}

}

function isEspecieValid(value) {
	for (var index in especies) {
		if (especies[index].valor == value) {
			return true;
		}
	}
	return false;
}

app.controller("pets", function($scope, $http) {

	$http.get("json.json")
		.then(function(response) {

			console.log(response.status + " - " + response.statusText +  " : " + response.data);
			if (response.status == 200) {
				$scope.pets = response.data;
			}
		}, function(response) {
			console.log(response.status + " - " + response.statusText +  " : " + response.data);
			alert("Problemas ao carregar a página. Tente novamente.");
		});

	$scope.ordernarPor = function(campo) {
		$scope.minhaOrdenacao = campo;
	}
});

app.controller("newPet", function($scope) {
	$scope.especies = especies;
});

app.directive("rnEspecie", function() {
	return {
		require : 'ngModel',
		link : function (scope, element, attr, ngModel) {
			function validar(value) {
				ngModel.$setValidity('especie',  isEspecieValid(value));
				return value;
			}
			ngModel.$parsers.push(validar);
		}
	};
});
// function validate() {

// 	var nome = document.getElementById("nome").value;
// 	var especie = document.getElementById("especie").value;
// 	var raca = document.getElementById("raca").value;
// 	var proprietario = document.getElementById("proprietario").value;

// 	var pet = new Pet(nome, especie, raca, proprietario);
	
// 	console.log(JSON.stringify(pet));

// 	if (!validatePet(pet)) {
// 		return false;
// 	}

// 	//enviar

// 	return true;

// }

// function validatePet(pet) {

// 	if (pet == undefined || pet == null) {
// 		alert("Erro de validação. Por favor, tenta novamente.");
// 		return false;
// 	}

// 	if (isEmpty(pet.getNome())) {
// 		alert("O nome do pet é de preenchimento obrigatório.");
// 		document.getElementById("nome").focus();
// 		return false;
// 	}

// 	if (pet.getNome().trim().length < 2) {
// 		alert("O nome do pet deve ter ao menos duas letras.");
// 		document.getElementById("nome").focus();
// 		return false;
// 	}

// 	if (isEmpty(pet.getEspecie())) {
// 		alert("A espécie do pet é de preenchimento obrigatório.");
// 		document.getElementById("especie").focus();
// 		return false;
// 	}

// 	if (!isEspecieValid(pet.getEspecie())) {
// 		alert("A espécie informada é inválida.");
// 		document.getElementById("especie").focus();
// 		return false;
// 	}

// 	if (isEmpty(pet.getRaca())) {
// 		alert("A raça do pet é de preenchimento obrigatório.");
// 		document.getElementById("raca").focus();
// 		return false;
// 	}

// 	if (pet.getEspecie().trim().length < 2) {
// 		alert("A espécie deve ter ao menos duas letras.");
// 		document.getElementById("especie").focus();
// 		return false;
// 	}

// 	if (!isEmpty(pet.getProprietario()) && pet.getProprietario().trim().length < 2) {
// 		alert("O nome do proprietário deve ter ao menos duas letras, quando informado.");
// 		document.getElementById("proprietario").focus();
// 		return false;
// 	}

// 	return true;
// }