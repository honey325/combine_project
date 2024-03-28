

var url = window.location.href;
var id = url.split("=")[1];
var result;
if (id != undefined || id != '') {

    document.getElementById('form').setAttribute('action', "/update")
}

async function fetching() {
    const response = await fetch(`/job_application2/getdata?id=${id}`);

    console.log(response);
    result = await response.json();
    // console.log(result);
    if (id != undefined || id != '') {
        map_values(result)
    }
}
fetching();

function map_values(result) {

    var id_input = document.getElementById('inserted_id');
    id_input.setAttribute('value', `${result.inserted_id}`)

    inputs = document.getElementsByClassName('text');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = result[inputs[i].name];
    }

    textArea = document.getElementsByTagName('textarea')
    for (let i = 0; i < textArea.length; i++) {
        textArea[i].innerHTML = result[textArea[i].name];
    }

    // console.log(result);
    // date = new Date(result["dob"])
    var dob = document.getElementById('dob')
    dob.value = result["dob"];
    var state = document.getElementById('state');
    var state_val = result.state;

    for (op of state) {
        if (op.value == state_val) {
            op.setAttribute('selected', true);
        }
    }

    var city = document.getElementById('city');
    var city_val = result.city;

    for (op of city) {
        if (op.value == city_val) {
            op.setAttribute('selected', true);
        }
    }
    var gender = document.getElementsByName('gender');
    gender_val = result.gender;

    for (op of gender) {
        if (op.value == gender_val) {
            op.checked = true;
        }
    }
    var rela_status = document.getElementById('rela_status');
    var rela_val = result.rela_status;
    for (op of rela_status) {
        if (op.value == rela_val) {
            op.setAttribute('selected', true);
        }
    }

    var dept = document.getElementById('dept');

    var dept_val = result.dept.split(',');
    for (op of dept) {

        if (dept_val.indexOf(op.value) != -1) {
            op.setAttribute('selected', true);
        }
        else {
            op.removeAttribute('selected');
        }
    }


    var lang_ele = document.getElementsByClassName('lang');

    var lang = result.lang;
    var edu_level = result.edu_level;
    if (lang != '') {
        for (let i = 0; i < lang.length; i++) {
            document.getElementById(`${lang[i]}`).checked = true;
            var op = document.getElementById(`${lang[i]}_${edu_level[i]}`);
            op.checked = true
            // console.log(`${lang[i]}_${edu_level[i]}`);
        }
    }
    var tech = result.tech;
    var kn_level = result.kn_level;
    if (tech != '') {
        for (let i = 0; i < tech.length; i++) {
            document.getElementById(`${tech[i]}`).checked = true;
            var op = document.getElementById(`${tech[i]}_${kn_level[i]}`);
            op.checked = true
            // console.log(`${lang[i]}_${edu_level[i]}`);
        }
    }


    var work_str = `<table id="work">`
    console.log(result.length);
    if (result.work_id.length > 0) {

        for (i = 0; i < result.work_id.length; i++) {

            work_str += `<tr class="require_col">

                            <td>
                                <input type="text" name="work_id[]" hidden value="${result.work_id[i]}">
                            </td>

                            <td>

                                <label> Company name : </label>
                                <input type="text" name="comp[]" value="${result.comp[i]}" id="comp1">
                            </td>
                            <td>
                                <label>Designation : </label>
                                <input type="text" name="des[]" class="string" value="${result.des[i]}" id="des1">
                            </td>
                            <td>
                                <label>From : </label>
                                <input type="text" name="from[]" class="date" value="${result.from[i]}" id="from1">
                            </td>
                            <td>
                                <label>To : </label>
                                <input type="text" name="to[]" class="date" value="${result.to[i]}" id="to1">
                            </td>
                        </tr>`


        }
        work_str += `</table>`
        document.getElementById('work_div').innerHTML = work_str;

    }

    else if (result.inserted_id.length > 1 && result.work_id.length == 0) {
        document.getElementById('work_div').innerHTML = work_str;
    }
    // console.log(result.inserted_id.length > 1 && result.work_id.length == 0);
    var ref_str = '<table id="ref_tbl">'
    if (result.ref_id.length > 0) {
        for (i = 0; i < result.work_id.length; i++) {
            ref_str += `<tr class="require_col">
                                    <td>
                                        <input type="text" name="ref_id[]" value="" hidden>
                                    </td>

                                    <td>
                                        <label for="ref_name">Name : </label>
                                        <input type="text" name="ref_name[]" class="string " value="" id="ref_name1">
                                    </td>
                                    <td>
                                        <label for="ref_name">Contact number : </label>
                                        <input type="text" name="ref_contact[]" class="contact" value="" id="contact1">
                                    </td>
                                    <td>
                                        <label for="ref_name">Relation : </label>
                                        <input type="text" name="relation[]" class="string" value="" id="relation1">
                                    </td>
                                    </tr>`
        }
        ref_str += `</table>`
        document.getElementById('ref_div').innerHTML = ref_str

    }
    else if (result.inserted_id != '' && result.ref_id.length == 0) {
        document.getElementById('ref_div').innerHTML = ref_str

    }
    dis = Array.from(document.getElementsByClassName('dis'));

    dis.forEach(ele => {

        if (document.getElementsByName(`${ele.name}`)[0].checked == false) {
            ele.checked = false;
            ele.setAttribute('disabled', true);
        }
        else if (document.getElementsByName(`${ele.name}`)[0].checked == true) {

            ele.removeAttribute('disabled');
        }
    });

}