const makeTable = function(){

    let our_table = document.querySelector('#admintable');
    let i,j,row;


    fetch('http://localhost:3002/seeallorders',{
            method: 'GET',
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response =>response.json())
        .then(data => {
            console.log(data)
            if(data.msg){
                if(data.msg=='no access token , pls login'||data.msg=='expired login again'||data.msg=='you are not admin'){
                    alert(data.msg);
                    return ;
                }
            }
            setTimeout(()=>{

                our_table.innerHTML=`<tr>
                    <th>Date(yyyy/mm/dd)</th>
                    <th>Order Details</th>
                    <th>Tx ID 2</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Click<th>
                    </tr>`;

                i=1;
                data.forEach(element => {
                    row = our_table.insertRow(i);
                    i=i+1;
                    j=0;

                    let temp = new Array(6)

                    for( prop in element ){

                        if(prop == 'time'){
                            temp[0]=element[prop];
                            temp[0] = (new Date(parseInt(temp[0]))).toISOString().slice(0,10)
                        }
                        else if(prop == 'orderdetails')temp[1]=element[prop];
                        else if(prop == 'tnx_no_2')temp[2]=element[prop];
                        else if(prop == 'ammount')temp[3]=element[prop];
                        else if(prop == 'status')temp[4]=element[prop];

                        
                    }

                    let t_string = ''

                    if(temp[4] != "seller paid")t_string='dead'

                    temp[5] = `<input type="button" class="payseller ${t_string}" id="${temp[2]}" name="" value="Deliver" >`
                    
                    temp.forEach(itm => {
                        row.insertCell(j).innerHTML=`${itm}`;                     // 0 1 2 3 4 
                        j=j+1;
                    });
                    
                });
                console.log('success');
            },500)
        })
        .catch(err=>{
            console.log("could not fetch");
            console.log(err);
        })

};


$(document).click(function(event){
    event.stopPropagation();
    let temp_id = event.target.id;
    let temp_el = document.querySelector(`#${temp_id}`)
    let temp_arr = $(`#${temp_id}`).attr('class').split(' ');
    let flag = false;
    temp_arr.forEach(itm=>{
        if(itm=="dead")flag=true;
    })
    if(flag==true){
        console.log('dead already');
        return;
    }
    let tnx_no_2 = temp_id;
    temp_el.classList.add("dead");
    let send_obj = {
        tnx_no_2,
    };
    fetch('http://localhost:3002/shipped',{
        method: 'POST',
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(send_obj)
    })
    .then(response =>response.json())
    .then(data => {
        setTimeout(()=>{
            alert(data.msg)
            console.log('success');
            
        },500)
    })
    .catch(err=>{
        console.log("could not fetch");
        console.log(err);
    })
});