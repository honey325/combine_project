
var work = document.getElementById('work')
var ref = document.getElementById('ref_tbl');



function append_row(field) {

  let tr = document.createElement('tr');
  tr.classList.add('require_col');

  if (field == "work") {
    var label_name = ["Company name : ", "Designation : ", "From : ", "To : "];
    var name = ["comp[]", "des[]", "from[]", "to[]"];
    var class_name = ["comp", "string", "date", "date"];
  }
  else if (field == "ref") {
    var label_name = ["Name : ", "Contact number : ", "Relation : "];
    var name = ["ref_name[]", "ref_contact[]", "relation[]"];
    var class_name = ["string", "contact", "string"];

  }

  for (let i = 0; i < label_name.length; i++) {
    let td = document.createElement('td');
    let label = document.createElement('label');
    let input = document.createElement('input');

    let comp = document.createTextNode(label_name[i]);
    label.appendChild(comp);

    input.setAttribute('name', name[i]);
    input.classList.add(class_name[i]);

    td.appendChild(label);
    td.appendChild(input);
    tr.appendChild(td);
  }
  if (field == 'work') {
    work.children[0].appendChild(tr)

  }
  else if (field == 'ref') {
    ref.children[0].appendChild(tr)

  }
}

function delete_row(field) {
  let trs = document.querySelectorAll(`#${field} tr`);
  let len = trs.length;
  if (len > 1) {
    var tr = trs[trs.length - 1];
    tr.remove();
  }
}
