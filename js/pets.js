var especies = ["cao", "gato"];

function isEspecieValid(value) {
	return especies.indexOf(value) != -1;
}

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

function validate() {

	var nome = document.getElementById("nome").value;
	var especie = document.getElementById("especie").value;
	var raca = document.getElementById("raca").value;
	var proprietario = document.getElementById("proprietario").value;

	var pet = new Pet(nome, especie, raca, proprietario);
	
	console.log(JSON.stringify(pet));

	if (!validatePet(pet)) {
		return false;
	}

	//enviar

	return true;

}

function validatePet(pet) {

	if (pet == undefined || pet == null) {
		alert("Erro de validação. Por favor, tenta novamente.");
		return false;
	}

	if (isEmpty(pet.getNome())) {
		alert("O nome do pet é de preenchimento obrigatório.");
		document.getElementById("nome").focus();
		return false;
	}

	if (pet.getNome().trim().length < 2) {
		alert("O nome do pet deve ter ao menos duas letras.");
		document.getElementById("nome").focus();
		return false;
	}

	if (isEmpty(pet.getEspecie())) {
		alert("A espécie do pet é de preenchimento obrigatório.");
		document.getElementById("especie").focus();
		return false;
	}

	if (!isEspecieValid(pet.getEspecie())) {
		alert("A espécie informada é inválida.");
		document.getElementById("especie").focus();
		return false;
	}

	if (isEmpty(pet.getRaca())) {
		alert("A raça do pet é de preenchimento obrigatório.");
		document.getElementById("raca").focus();
		return false;
	}

	if (pet.getEspecie().trim().length < 2) {
		alert("A espécie deve ter ao menos duas letras.");
		document.getElementById("especie").focus();
		return false;
	}

	if (!isEmpty(pet.getProprietario()) && pet.getProprietario().trim().length < 2) {
		alert("O nome do proprietário deve ter ao menos duas letras, quando informado.");
		document.getElementById("proprietario").focus();
		return false;
	}

	return true;
}