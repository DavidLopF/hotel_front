import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface Hotel {
  id: number;
  capacity: number;
  description: string;
  imgUrl: string;
  numberRooms: number;
  siteId: number;
  ubication: string;
}

interface Room {
  id: number;
  available: number;
  idHotel: number;
  capacity: number;
  price: number;
  roomType: string;
  siteId: number;
  typeName: string;
  ubication: string;
  capacityHotel: number;
}


@Component({
  selector: 'app-hotels-information',
  templateUrl: './hotels-information.component.html',
  styleUrls: ['./hotels-information.component.css']
})
export class HotelsInformationComponent implements OnInit {

  hotels: Hotel[] = [];
  countHotels: number = 0;
  allrooms: Room[];
  roomsVip: Room[];
  roomsStandard: Room[];
  roomsPremium: Room[];
  priceStandard: number = 0;
  priceVip: number = 0;
  pricePremium: number = 0;

  constructor(private toastr: ToastrService) {

  }
  ngOnInit(): void {
    fetch('http://localhost:8080/api/getHotels')
      .then(response => response.json())
      .then(res => {
        if (res.status == "SUCCESS") {
          this.hotels = res.data;
          this.countHotels = this.hotels.length;
        }
      }).catch(err => {
        console.log(err);
        this.toastr.error('Cargando Lista de hoteles', 'Error');
      });
  }
  hoverHotel(id) {
    let hotel = document.getElementById(id);
    hotel.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)";
  }

  lefthoverHotel(id) {
    let hotel = document.getElementById(id);
    hotel.style.boxShadow = "none";
  }

  redirect(id) {
    let hotel = this.hotels.find(hotel => hotel.id == id);
    fetch('http://localhost:8080/api/roomsByIdSite?idSite=' + hotel.siteId)
      .then(response => response.json())
      .then(res => {
        if (res.status == "SUCCESS") {
          this.allrooms = res.data;
          this.roomsStandard = res.data.filter(room => room.roomType == "1");
          this.roomsVip = res.data.filter(room => room.roomType == "2");
          this.roomsPremium = res.data.filter(room => room.roomType == "3");
          this.priceStandard = this.roomsStandard[0].price;
          this.priceVip = this.roomsVip[0].price;
          this.pricePremium = this.roomsPremium[0].price;

        }
      }).catch(err => {
        console.log(err);
        this.toastr.error('Cargando informacion de habitaciones', 'Error');
      }).then(() => {
        localStorage.setItem("roomsStandard", JSON.stringify(this.roomsStandard));
        localStorage.setItem("roomsVip", JSON.stringify(this.roomsVip));
        localStorage.setItem("roomsPremium", JSON.stringify(this.roomsPremium));
        localStorage.setItem("priceStandard", JSON.stringify(this.priceStandard));
        localStorage.setItem("priceVip", JSON.stringify(this.priceVip));
        localStorage.setItem("pricePremium", JSON.stringify(this.pricePremium));
        localStorage.setItem("allrooms", JSON.stringify(this.allrooms));
        localStorage.setItem("hotel", JSON.stringify(hotel));
        window.location.href = "http://localhost:4200/roomsHotel"
      });




  }

}
