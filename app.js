$(document).ready(function () {

	// On Data bind changing
	$("*[bind]").on('input', function (e) {
    // Bind data
		var to_bind = $(this).attr('bind');
		$("*[bind='"+to_bind+"']").html($(this).val());
    $("*[bind='"+to_bind+"']").val($(this).val());
    // Update tax free income
    formula();
  });
  
  function formula () {
    var monthlyOrYearly = $('input[name=monthlyOrYearly]:checked').val();
    var grossSalary = $("#grossSalary").val();
    var a = 500;
    var b = grossSalary / monthlyOrYearly;
    var c = 1200;
    var d = 1.8;
    var y = ((b - c) / d);
    // Don't let taxFreeIncome go over 500 eur
    y < 0 ? x = 500 : x = a - y;
    // Check if grossSalary is more than 2100 eur monthly
    if (b >= 2100) {
      x = 0;
      popUpWindow(true);
    } else { 
      x = x;
      popUpWindow(false);
    }
    $(".taxFreeIncome").text(x.toFixed(2) + " €");
  }

  // If year on month is selected
  $("input[name=monthlyOrYearly]").on('change', function (e) {
    // Update tax free income
    formula();
  });
  
  // Pop-up
  function popUpWindow (display) {
    this.display = display;
    if (display) {
      $(".popUp").slideDown("slow", function() {$(this).css('opacity', '1')});
    } else {
      $(".popUp").slideUp("slow", function() {$(this).css('opacity', '0')});
    }
  }

  // Simple language switch: ET
  $("#et").on('click', function () {
    $("html").attr('lang', 'et');
    $(".text-heading").text('Maksuvaba tulu kalkulaator');
    $(".text-error").text('Maksuvaba tulu 0 eurot, kuna aastatulu on rohkem kui 25 200 eurot.');
    $(".text-insert").text('Sisesta brutopalk');
    $(".text-month").text('Kuus');
    $(".text-year").text('Aastas');
    $(".text-income").text('Maksuvaba tulu');
  });

  // Simple language switch: EN
  $("#en").on('click', function () {
    $("html").attr('lang', 'en');
    $(".text-heading").text('Tax-free Income Calculator');
    $(".text-error").text('Tax-free income is 0 because yearly income is exceeding 25 200 €.');
    $(".text-insert").text('Insert Gross Salary');
    $(".text-month").text('Monthly');
    $(".text-year").text('Yearly');
    $(".text-income").text('Tax-free income');
  });

});
