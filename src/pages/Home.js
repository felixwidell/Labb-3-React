import "../App.css";

export default function Home() {
    return (
        <div className="homeContainer">
            <div className='img-background'>
            <h1 class="display-4 text-white">Felix Restaurang</h1>
            <h2 class="text-white">Här kan du komma åt<br />bokningar och lediga bord</h2>
            </div>
            <a href='/booking' className="bookingLink">Skapa bokning</a>
        </div>


);
}