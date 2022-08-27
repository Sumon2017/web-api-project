const makeTable = function(){

    let our_table = document.querySelector('#ordertable');
    let i,j,row;


    fetch('http://localhost:3001/myorders',{
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
                if(data.msg=='no access token , pls login'||data.msg=='expired login again'){
                    alert(data.msg);
                    return ;
                }
            }
            setTimeout(()=>{

                our_table.innerHTML=`<tr>
                    <th>Date(yyyy/mm/dd)</th>
                    <th>Order Details</th>
                    <th>Tx ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    </tr>`;

                i=1;
                data.forEach(element => {
                    row = our_table.insertRow(i);
                    i=i+1;
                    j=0;

                    let temp = new Array(5)

                    for( prop in element ){

                        if(prop == 'time'){
                            temp[0]=element[prop];
                            temp[0] = (new Date(parseInt(temp[0]))).toISOString().slice(0,10)
                        }
                        else if(prop == 'orderdetails')temp[1]=element[prop];
                        else if(prop == 'tnx_no')temp[2]=element[prop];
                        else if(prop == 'ammount')temp[3]=element[prop];
                        else if(prop == 'status')temp[4]=element[prop];

                        
                    }
                    
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
