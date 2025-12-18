document.addEventListener('DOMContentLoaded', prepare_page, false);

async function prepare_page() {
    set_up_recursive_links();
}

async function get_parsed_html(url) {
    console.log(`[fetch_element] Fetching URL: ${url}`);
    try {
        const data = await fetch(url).then(res => {
            console.log(`[fetch_element] Response status: ${res.status}`);
            return res.text();
        });
        console.log(`[fetch_element] Fetched data length: ${data.length}`);
        const parsed = new DOMParser().parseFromString(data, 'text/html');
        console.log(`[fetch_element] Parsed HTML successfully`);
        return parsed;
    } catch (err) {
        console.error(`[fetch_element] Error fetching or parsing:`, err);
        throw err; // rethrow so caller knows
    }
}

async function fetch_element_using_selector(url, selector) {
    console.log(`[fetch_element_using_selector] URL: ${url}, Selector: ${selector}`);
    try {
        const parsed = await get_parsed_html(url);
	console.log(parsed)
        const element = parsed.querySelector(selector);
        if (element) {
            console.log(`[fetch_element_using_selector] Found element:`, element);
        } else {
            console.warn(`[fetch_element_using_selector] Element not found for selector: ${selector}`);
        }
        return element;
    } catch (err) {
        console.error(`[fetch_element_using_selector] Error:`, err);
        throw err;
    }
}


function set_up_recursive_links() {
    const recursive_link_elements = document.getElementsByClassName("rlink");
    const rlink_array = Array.from(recursive_link_elements);

    for (let i = 0; i < rlink_array.length; i++) {
        const rlink_element = rlink_array[i]
         setup_recursive_link(rlink_element);
    }
}

function setup_recursive_link(rlink_element) {

    rlink_element.dataset.openedAtLeastOnce = false;
    rlink_element.dataset.currentlyOpened = false;

    full_destination_url = rlink_element.href;

    const split_url = full_destination_url.split("#") // also removes the #

    console.assert(split_url.length == 2, split_url);

    var destination_url = split_url[0]
    const destination_id = "#"+ split_url[1] // add it back on

    if (destination_url == "") {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        destination_url = page;
    }

    console.assert(destination_url != "")

    rlink_element.onclick = async function(event) {

        event.preventDefault(); // make sure we don't travel to the link

        const first_time_opening = rlink_element.dataset.openedAtLeastOnce == "false" && rlink_element.dataset.currentlyOpened == "false"; // strings used since data-* attributes only pass through as string
        if (first_time_opening) { // create the element
			console.log(destination_url);
			console.log(destination_id);
            let destination_element = await fetch_element_using_selector(destination_url, destination_id);

	    // this line adds the element here.
            rlink_element.after(destination_element)

            destination_element.classList.add("expanded-rlink");

	    // const destinationTitle = destinationElement.querySelector(".title")

            const recursive_rlinks = destination_element.querySelectorAll(".rlink") 

            for (let i = 0; i < recursive_rlinks.length; i++) {
                const recursive_rlink = recursive_rlinks[i]
		// here we go again
                setup_recursive_link(recursive_rlink);
            }


        } else { // after created, we just toggle visibility
            console.assert(rlink_element.nextSibling.classList.contains("expanded-rlink") , "the expanded knowledge should have already been added as a sibiling");
            const expanded_rlink_element = rlink_element.nextSibling
            if (rlink_element.dataset.currentlyOpened == "true") {
                expanded_rlink_element.style.display = "none";
            } else {
                expanded_rlink_element.style.display = "block";
            }
        }

        rlink_element.dataset.currentlyOpened = rlink_element.dataset.currentlyOpened == "true" ? "false" : "true";
        rlink_element.dataset.openedAtLeastOnce = true;
    }

}
