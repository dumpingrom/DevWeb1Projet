"use strict"

$(function () {
	//Vars globales
	var input = $("#converterInput"); // champ texte du convertisseur
	var red = "#EA5353"; // couleur a utiliser pour les erreurs
	var decimal = /^[0-9]+([\,\.][0-9]+)?$/; // regexp definissant un nombre decimal valide

	var conversionType = {
		from: "km",
		to: "mile"
	};

	function setConversionType (from, to) {
		conversionType.from = from;
		conversionType.to = to;
	}

	function getConversionType (p) {
		return conversionType[p];
	}
	
	/****************
	HANDLERS
	****************/
	$(document).on({
		click: function () {

			if($("#converter").attr("calc-done") == "false") {
				/*
					CHIFFRES / POINT
				*/
				if($(this).attr("id") != "equals") {
					//Si le champ contient uniquement un 0, on le remplace avec la valeur entree
					if(input.val() == '0') {
						input.val($(this).text());
					}
					//Sinon on concatene la valeur choisie avec la valeur deja existante
					else {
						input.val(input.val()+$(this).text());	
					}

					//afficher 0 si plusieurs 0
					var patt = /^0{2,}/;
					if(patt.test(input.val())) {
						input.val('0');
					}
					if(decimal.test(input.val())){
						input.css("background-color", "white");
					}
					else {
						input.css("background-color", red);
					}
				}

				/*
					RESULTAT (=)
				*/
				else {
					var result = convert(input.val(), $("#selConversion").val());
					if (!isNaN(result)) {
						//console.log(input.val() + " " + getConversionType("from") + " = " + result + " " + getConversionType("to"));
						$("#spanResult").html(input.val() + " " + getConversionType("from") + " = " + result + " " + getConversionType("to"));
						input.val(result);
						input.css("background-color", "white");
						//empecher de concatener les valeurs des boutons
						$("#converter").attr("calc-done", "true");
					}
					else {
						input.css("background-color", red);
						//console.log(input.val());
						//console.log($("#selConversion").val());
						//console.log(result);
					}
				}
			}
			else {
				/*
					CHIFFRES / POINT
				*/
				//On reinitialise le champ et l'attribut calc-done
				if($(this).attr("id") != "equals") {
					input.val($(this).text());
					$("#converter").attr("calc-done", "false");
				}
			}
		}
	}, "#converter button");

	$(document).on({
		keyup: function() {
			if(!decimal.test(input.val())) {
				input.css("background-color", red);
			}
			else {
				input.css("background-color", "white");
			}
		}
	}, "#converterInput");

	$(document).on({
		change: function() {
			switch ($(this).val()) {
				case "kmMile":
				setConversionType("Km(s)", "Mile(s)");
				break;

				case "mileKm":
				setConversionType("Mile(s)", "Km(s)");
				break;

				case "fahrCels":
				setConversionType("Fahrenheit", "Celsius");
				break;

				case "celsFahr":
				setConversionType("Celsius", "Fahrenheit");
				break;
			}
		}
	}, "#selConversion");

	function convert (value, type) {
		switch (type) {
			case "kmMile":
			return (value*0.621371192).toFixed(2);

			case "mileKm":
			return (value*1.609344).toFixed(2);

			case "fahrCels":
			return ((value - 32)*5/9).toFixed(2);

			case "celsFahr":
			return (value*9/5+32).toFixed(2);
		}
	}
});