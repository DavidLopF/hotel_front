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

interface prices {
  price: number;
  type: string;
  typeId: number;
}


@Component({
  selector: 'app-rooms-information',
  templateUrl: './rooms-information.component.html',
  styleUrls: ['./rooms-information.component.css']
})
export class RoomsInformationComponent implements OnInit {

  selectedHotel: Hotel;
  allrooms: Room[];
  roomsVip: Room[];
  roomsStandard: Room[];
  roomsPremium: Room[];
  priceStandard: number = 0;
  priceVip: number = 0;
  pricePremium: number = 0;
  prices: prices[]
  columnsPrices = ['id', 'tipo', 'precio', 'cantidad'];
  showButton: boolean = false;



  constructor(private toastr: ToastrService) {
    this.selectedHotel = JSON.parse(localStorage.getItem("hotel"));
    this.allrooms = JSON.parse(localStorage.getItem("rooms"));
    this.roomsVip = JSON.parse(localStorage.getItem("roomsVip"));
    this.roomsStandard = JSON.parse(localStorage.getItem("roomsStandard"));
    this.roomsPremium = JSON.parse(localStorage.getItem("roomsPremium"));
    this.priceStandard = JSON.parse(localStorage.getItem("priceStandard"));
    this.priceVip = JSON.parse(localStorage.getItem("priceVip"));
    this.pricePremium = JSON.parse(localStorage.getItem("pricePremium"));

    this.prices = [
      { price: this.priceStandard, type: "Standard", typeId: 1 },
      { price: this.priceVip, type: "Vip", typeId: 2 },
      { price: this.pricePremium, type: "Premium", typeId: 3 }
    ]
  }

  validateNumberInput() {
    let count= 0;
    this.prices.forEach(price => {
      let input = document.getElementById(price.typeId.toString()) as HTMLInputElement;
      if (input.value == "") {
        input.value = "0";
      }
      if (parseInt(input.value) > 0 && input.value.charAt(0) == "0") {
        input.value = input.value.substring(1);
      }
      if (parseInt(input.value) < 0) {
        input.value = "0";
      }
      if (parseInt(input.value) >= 1) {
        count++;
      }
    });
    if (count > 0) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }



  ngOnInit(): void {




  }

}
