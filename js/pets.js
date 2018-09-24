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

function fakeRequest(pet) {
	alert(pet.nome + " cadastrado com sucesso!");
}

function isEspecieValid(value) {
	if (isEmpty(value)) {
		return false;
	}
	for (var index in especies) {
		if (especies[index].valor == value) {
			return true;
		}
	}
	return false;
}

app.controller("pets", function($scope, $http) {

	$http.get("repository/pets.json")
		.then(function(response) {

			if (response.status == 200) {
				$scope.pets = response.data;
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

app.controller("newPet", function($scope, $http) {

	$scope.especies = especies;

	$scope.submit = function(form) {
		
		if (!form.$valid) {
			alert("Por favor, preencha o formulário corretamente.");
			return false;
		}

		var pet = new Pet($scope.nome, $scope.especie, $scope.raca, $scope.proprietario);
		$http.post("newPet.html").then(fakeRequest(pet));

		$scope.nome = undefined;
		$scope.especie = undefined;
		$scope.raca = undefined;
		$scope.proprietario = undefined;

		form.nome.$setPristine();
		form.especie.$setPristine();
		form.raca.$setPristine();
		form.proprietario.$setPristine();

		return true;

	}

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