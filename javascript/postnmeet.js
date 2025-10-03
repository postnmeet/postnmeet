document.getElementById('welcome-modal').style.display = '';
document.getElementById('post_button_out').style.display = 'none';
document.getElementById('modal').style.display = 'none';


let posts = [];

let container = document.querySelector('.js-post-div')

function welcomeModalClose()
{
    document.getElementById('welcome-modal').style.display = 'none';
    document.getElementById('post_button_out').style.display = '';
}

function open_modal()
{
    document.getElementById('modal').style.display = '';
    document.getElementById('post_button_out').style.display = 'none';
}

function close_modal()
{
    document.getElementById('modal').style.display = 'none';
    document.getElementById('post_button_out').style.display = '';
}


function add_post()
{
    let post_button = document.querySelector('.post_button');

    if(document.querySelector('.modal-name').value && document.querySelector('.modal-event').value && document.querySelector('.modal-city').value && document.querySelector('.modal-contact').value)
    {
        posts.push(
            [{
                modal_name : document.querySelector('.modal-name').value,
                modal_event : document.querySelector('.modal-event').value,
                modal_venue : document.querySelector('.modal-venue').value,
                modal_city : document.querySelector('.modal-city').value,
                modal_time : document.querySelector('.modal-time').value,
                modal_date : document.querySelector('.modal-date').value,
                modal_map : document.querySelector('.modal-map').value,
                modal_contact : document.querySelector('.modal-contact').value
            }, dayjs()]);

        document.querySelector('.modal-name').value = '';
        document.querySelector('.modal-event').value = '';
        document.querySelector('.modal-venue').value = '';
        document.querySelector('.modal-city').value = '';
        document.querySelector('.modal-time').value = '';
        document.querySelector('.modal-date').value = '';
        document.querySelector('.modal-map').value = '';
        document.querySelector('.modal-contact').value = '';

        document.getElementById('modal').style.display = 'none';
        document.getElementById('post_button_out').style.display = '';

        timeout(post_button, 10000)
    }

    else
    {
        alert('Please Fill in the Required (*) Details');
        //document.getElementById('modal').style.display = '';
    }
    
}

function display_posts()
{
    let post_list = '';

    for(let i=0; i<posts.length; i++)
    {
        
        post_list += `<div class='ind_post'>
                        <p>Name : ${posts[i][0].modal_name}</p>
                        <p>Event : ${posts[i][0].modal_event}</p>
                        <p>Venue : ${posts[i][0].modal_venue}</p>
                        <p>City : ${posts[i][0].modal_city}</p>
                        <p>Time : ${posts[i][0].modal_time}</p>
                        <p>Date : ${posts[i][0].modal_date}</p>
                        <p>Map : <a href = "${posts[i][0].modal_map}" target = "_blank">Unlock Location!</a></p>
                        <p>Contact : ${posts[i][0].modal_contact}</p>
                        <br>
                        <p>${time_since_post(posts[i][1])}</p>
                    </div>`;
        document.querySelector('.js-post-div').innerHTML = post_list;

        let last = container.lastElementChild;
        if(last)
        {
            last.scrollIntoView({behavior: 'auto', block: 'start'})
        };
    }

    delete_old();

}

function get_date_data()
{
    return dayjs().format('DD-MM-YYYY HH:mm:ss')
    //const date_data = new Date();
    //return `Post Time : ${date_data.getHours()}:${date_data.getMinutes()}:${date_data.getSeconds()} <br> Post Date : ${date_data.getDay()}-${date_data.getMonth()}-${date_data.getFullYear()}`
}

function time_since_post(post_time)
{
    let current_time = dayjs();
    post_time = dayjs(post_time);
    let time_elap = current_time.diff(post_time);

    if(parseInt(time_elap/1000) < 60)
    {
        return String(parseInt(time_elap/1000))+' seconds ago'
    }

    else if(60<=parseInt(time_elap/1000)<3600)
    {
        return String(parseInt(parseInt(time_elap/1000)/60))+' minutes ago'
    }
    else
    {
        return String(parseInt(parseInt(parseInt(time_elap/1000)/60)/60))+' hours ago'
    }
    
}

function search()
{
    let post_list = '';

    let search_query = document.querySelector('.search-input').value;    
    for(let i=0; i<posts.length; i++)
    {
        Object.values(posts[i][0]).forEach(value => 
            {
                if(search_query == '')
                {
                    display_posts()
                }

                else if(value.toLowerCase().includes(search_query.toLowerCase()))
                {
                    post_list += `<div class='ind_post'>
                        <p>Name : ${posts[i][0].modal_name}</p>
                        <p>Event : ${posts[i][0].modal_event}</p>
                        <p>Venue : ${posts[i][0].modal_venue}</p>
                        <p>City : ${posts[i][0].modal_city}</p>
                        <p>Time : ${posts[i][0].modal_time}</p>
                        <p>Date : ${posts[i][0].modal_date}</p>
                        <p>Map : <a href = "${posts[i][0].modal_map}" target = "_blank">Unlock Location!</a></p>
                        <p>Contact : ${posts[i][0].modal_contact}</p>
                        <br>
                        <p>${time_since_post(posts[i][1])}</p>
                    </div>`;
                    document.querySelector('.js-post-div').innerHTML = post_list;
                }
            })
    }    
}

function timeout(post_button, time_milsec)
{
    let time_sec = time_milsec/1000

    post_button.disabled = true;

    post_button.innerText = `Wait ${time_sec}`;

    let interval = setInterval(
        ()=>{
            time_sec-=1;

            if(time_sec>0)
            {
                post_button.innerText = `Wait ${time_sec}`;
            }

            else
            {
                clearInterval(interval);
                post_button.innerHTML = 'Post &#8594;';
                post_button.disabled = false;
            }
        }
    ,1000)
}

function in_modal_keyDown()
{
    if(event.key=='Enter')
        {add_post(); display_posts();}; 
    
    if(event.key==='Escape')
        {close_modal()};
}

function save_post_in_file()
{

}

function delete_old()
{
    posts.forEach((post) => {
        if(post[1] == '1 minutes ago')
        {
            posts.shift()
        }
    })
}
