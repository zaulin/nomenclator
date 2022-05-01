function keyupInput1(){
  document.getElementById("myInputCodi").value = "";
  buscar();
}

function keyupInput2(){
  document.getElementById("myInputCodi").value = "";
  buscar();
}

function keyupDrowDown(){
  document.getElementById("myInputCodi").value = "";
  buscar();
}

function buscar() {
  var input, filter, table, tr, td, i, txtValue, iHits;

  iHits = 0;

  inputFamilia = document.getElementById("inputFamilia");
  filterFamilia = normalice(inputFamilia.selectedOptions[0].value.toUpperCase());

  input = document.getElementById("myInput");
  filter = normalice(input.value.toUpperCase());

  input2 = document.getElementById("myInput2");
  filter2 = normalice(input2.value.toUpperCase());

  inputCodi = document.getElementById("myInputCodi");
  filterCodi = normalice(inputCodi.value.toUpperCase());

  logic = document.getElementById("button");
  operator = logic.innerText;

  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  if (filterCodi != "") {
    document.getElementById("inputFamilia").value = "";
    document.getElementById("myInput").value = "";
    document.getElementById("myInput2").value = "";

    for (i = 0; i < tr.length; i++) {
      hit = 0;
      tdCodi = tr[i].getElementsByTagName("td")[1];
      if (tdCodi) {
        txtCodi = normalice(tdCodi.textContent || tdCodi.innerText);
        if (txtCodi.toUpperCase().indexOf(filterCodi) > -1) {
          hit = 1;
        }

        if (hit==1) {
          tr[i].style.display = "";
          iHits = iHits + 1;
        } else {
          tr[i].style.display = "none";
        }
      }
    }

  } else {

    if (filter == "") {
      if (filter2 != "") {
        filter = filter2;
        filter2 = "";
      }
    }


    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      tdFamilia = tr[i].getElementsByTagName("td")[0];
      if (td) {
        
        hit = 0;

        txtValue = normalice(td.textContent || td.innerText);
        txtValueFamilia = normalice(tdFamilia.textContent || tdFamilia.innerText);
        if (txtValueFamilia.toUpperCase().indexOf(filterFamilia) > -1) {

          if (filter2 == "") {
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              hit = 1
            } else {
              hit = 0;
            }  
          } else {
          
            //miramos el operador
            if (operator == "i") {
              //operador AND
              if (txtValue.toUpperCase().indexOf(filter) > -1 && txtValue.toUpperCase().indexOf(filter2) > -1) {
                hit = 1
              } else {
                hit = 0;
              }  

            } else {
              //operador OR
              if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue.toUpperCase().indexOf(filter2) > -1) {
                hit = 1
              } else {
                hit = 0;
              }  
            }
          }
        } else {
          tr[i].style.display = "none";
        }

        if (hit==1) {
          tr[i].style.display = "";
          iHits = iHits + 1;
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  if (iHits == 1) {
    document.getElementById("hitCounter").innerHTML = iHits + " coincidència." 
  } else {
    document.getElementById("hitCounter").innerHTML = numberWithCommas(iHits) + " coincidències." 
  }
  
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function changeButton(){
  var btn = document.getElementById("button");
  if(btn.innerText=="i"){
   btn.innerText="o";
  }
  else{
    btn.innerText="i";
  }
  buscar();
}

function reset(){
  document.getElementById("button").innerText = "i";

  document.getElementById("inputFamilia").value = "";

  document.getElementById("myInput").value = "";

  document.getElementById("myInput2").value = "";

  document.getElementById("myInputCodi").value = "";
  

  buscar();
}

function normalice(text){
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function esconde() {
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    th = tr[i].getElementsByTagName("th")[0];
    if (td) {
          td.style.display = "none";
    }
    if (th) {
          th.style.display = "none";
    }

    for (j = 3; j < 14; j++) {
      td = tr[i].getElementsByTagName("td")[j];
      th = tr[i].getElementsByTagName("th")[j];
      if (td) {
            td.style.display = "none";
      }
      if (th) {
            th.style.display = "none";
      }  
    }
    
  }

  reset();
}

function off() {
  document.getElementById("overlay").style.display = "none";
}

function tableClick(el) {
  var indice, table, tr, td;
  indice = $(el).closest('tr').index();

  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  td = tr[indice + 1].getElementsByTagName("td")

  //document.getElementById("popUpCodigo").innerText = td[1].innerText;
  document.getElementById("popUpDesc").innerHTML = "<strong>" + td[1].innerText + "</strong>: " + td[2].innerText;
  document.getElementById("popUpNormativa").innerText = td[3].innerText + " - Article: " + td[4].innerText;
  //document.getElementById("popUpArticle").innerText = td[4].innerText;
  document.getElementById("popUpImporte").innerText = td[5].innerText + "€ / " + td[6].innerText + "€";
  if (td[7].innerText == "S") {
    document.getElementById("cboxRetirada").checked = true;
  } else {
    document.getElementById("cboxRetirada").checked = false;
  }
  if (td[8].innerText == "S") {
    document.getElementById("cboxPunts").checked = true;
  } else {
    document.getElementById("cboxPunts").checked = false;
  }
  if (td[9].innerText == "1") {
    document.getElementById("cboxCondicional").checked = true;
  } else {
    document.getElementById("cboxCondicional").checked = false;
  }
  if (td[13].innerText == "S") {
    document.getElementById("cboxIntervencio").checked = true;
  } else {
    document.getElementById("cboxIntervencio").checked = false;
  }

  document.getElementById("popUpAbits").innerText = td[10].innerText;
  
  document.getElementById("overlay").style.display = "block";
}
