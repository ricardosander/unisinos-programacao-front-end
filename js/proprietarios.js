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

app.controller("newProprietario", function($scope) {
	
});

app.controller("proprietarios", function($scope) {
	
	$scope.proprietarios = [
		new Pessoa("Ricardo", "(51) 99134-5589", "Rua tal 123, Humaitá, Porto Alegre"),
		new Pessoa("Carol", "(51) 99124-5586", "Av Renner 67, Gleba, Canoas"),
		new Pessoa("Altair", "(51) 98734-5422", "Rua 45 95, Rio Branco, Porto Alegre")
	];

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

// function validar() {

// 	var nome = document.getElementById("nome").value;
// 	var telefone = document.getElementById("telefone").value;
// 	var endereco = document.getElementById("endereco").value;

// 	var pessoa = new Pessoa(nome, telefone, endereco);
	
// 	console.log(JSON.stringify(pessoa));

// 	if (!validarPessoa(pessoa)) {
// 		return false;
// 	}

// 	//enviar

// 	return true;
// }

// function validarPessoa(pessoa) {

// 	if (pessoa == undefined || pessoa == null) {
// 		alert("Erro de validação. Por favor, tenta novamente.");
// 		return false;
// 	}

	
// 	if (isEmpty(pessoa.getNome())) {
// 		alert("O nome do proprietário é de preenchimento obrigatório.");
// 		document.getElementById("nome").focus();
// 		return false;
// 	}


// 	if (!isNomeValido(pessoa.getNome())) {
// 		alert("Cada parte do nome do proprietário deve ter ao menos duas letras.");
// 		document.getElementById("nome").focus();
// 		return false;
// 	}

// 	if (!isNomeCompleto(pessoa.getNome())) {
// 		alert("Informe nome e sobrenome.");
// 		document.getElementById("nome").focus();
// 		return false;
// 	}

// 	if (isEmpty(pessoa.getTelefone())) {
// 		alert("O telefone do proprietário é de preenchimento obrigatório. Informe somente dígitos contendo 11 dígitos (contendo DDD).");
// 		document.getElementById("telefone").focus();
// 		return false;
// 	}

// 	if (!isTelefoneValido(pessoa.getTelefone())) {
// 		alert("O telefone informado é inválido.");
// 		document.getElementById("telefone").focus();
// 		return false;
// 	}

// 	if (isEmpty(pessoa.getEndereco())) {
// 		alert("A raça do pet é de preenchimento obrigatório.");
// 		document.getElementById("endereco").focus();
// 		return false;
// 	}

// 	if (!isEnderecoValido(pessoa.getEndereco())) {
// 		alert("Informe endereço com tipo de logradouro, nome do logradouro, número, bairro e cidade, separados por vírgula.");
// 		document.getElementById("endereco").focus();
// 		return false;
// 	}

// 	return true;
// }

