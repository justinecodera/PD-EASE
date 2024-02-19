   // Update date and time in the upper right corner of Container-1
   function updateDateTime() {
    const dateTimeContainer = document.getElementById('date-time');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    dateTimeContainer.textContent = formattedDate;
}

// Call the function initially and set an interval to update every second
updateDateTime();
setInterval(updateDateTime, 1000);