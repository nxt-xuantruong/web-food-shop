var foodContainer = document.getElementById('food-container');
var loadMoreBtn = document.getElementById('load-more-btn');
var hideBtn = document.getElementById('hide-btn');
var startIndex = 0;
var endIndex = 8;
// Hàm gọi API để lấy danh sách món ăn
function getFoods() {
  fetch('https://649436760da866a953675acb.mockapi.io/menufood')
    .then(response => response.json())
    .then(data => {
      // Kiểm tra nếu còn món ăn để hiển thị
      if (data.length > endIndex) {
        loadMoreBtn.style.display = 'block';
      }

      // Hiển thị danh sách món ăn
      for (var i = startIndex; i < endIndex; i++) {
        var food = data[i];
        var foodItem = document.createElement('li');
        foodItem.classList.add('card');
        foodItem.innerHTML = `
            <img src='${food.image}' class="card-img-top" style='height:200px'>
            <div class="card-body">
                <div class='row'>
                    <h5 class="card-title float-start" style='width:70%'>${food.foodName}</h5>
                    <p class='float-end' style='width:30%'>${food.price}$</p>
                </div>
                <p class="card-text">There are many things are needed to start the Fast Food Business.</p>
                <button href="#" class="btn btn-web float-start" id='btn-add' onclick='addToCart(this)' style="width:40px">+</button>
                <div class="my-2 star-rating float-end" style="--rating: ${food.star};"></div>
            </div>
        `;
        foodContainer.appendChild(foodItem);
      }

      // Tăng chỉ số để lấy thêm món ăn tiếp theo
      startIndex = endIndex;
      endIndex += 8;
    })
    .catch(error => console.error(error));
}
// Hàm gọi khi nhấn nút "Xem thêm"
function loadMore() {
  getFoods();
  loadMoreBtn.style.display = 'none';
  hideBtn.style.display = 'block';
}

// Hàm gọi khi nhấn nút "Ẩn"
function hideItems() {
  startIndex = 0;
  endIndex = 8;
  foodContainer.innerHTML = '';
  getFoods();
  hideBtn.style.display = 'none';
}

// Gọi hàm để hiển thị món ăn ban đầu
getFoods();


const reviewContainer = document.getElementById('review-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
let id=1;
function getReview() {
    fetch(`https://649436760da866a953675acb.mockapi.io/review/${id}`)
    .then(response => response.json())
    .then(data => {
        let {name,avatar,job,star}=data;
        reviewContainer.innerHTML=`
            <img src="${avatar}" class="rounded-circle my-4">
            <p class="w-75 my-3" style="margin:0 auto;">You need not only Just Food Stalls with Persons but also specialized equipment, Skills to manage Customers, Effective Product catlogues etc very successful to make your.</p>
            <div class="my-2 star-rating" style="--rating: ${star}; margin:0 auto;"></div>
            <h3>${name}</h3>
            <p>${job}</p>
        `
    })
}
nextButton.addEventListener('click',()=>{
    id++;
    if (id>10) {
        id=1;
    }
    getReview();
})

prevButton.addEventListener('click',()=>{
    id--;
    if (id<1) {
        id=10;
    }
    getReview()
})

getReview()

let cart = [];
function addToCart(x) {
  let food = x.parentElement.parentElement;
  let nameFood = food.querySelector('.card-title').innerText;
  let priceFood = food.querySelector('.float-end').innerText;
  let imageElement = food.querySelector('img');
  let src = imageElement.getAttribute('src');
  let quantity= 1;
  let foodInfo = [nameFood, priceFood, src,quantity];
  // Kiểm tra xem món ăn đã tồn tại trong giỏ hàng hay chưa
  let existingFood = cart.find(item => item[0] === nameFood);
  if (existingFood) {
    // Nếu món ăn đã tồn tại, cập nhật số lượng
    existingFood[3]+=1; // Giả sử số lượng được lưu ở vị trí thứ 3 trong mảng foodInfo
  } else {
    // Nếu món ăn chưa tồn tại, thêm món ăn mới vào giỏ hàng
    let foodInfo = [nameFood, priceFood, src, quantity]; // Thêm số lượng 1 vào mảng foodInfo
    cart.push(foodInfo);
  }
}

function showMyCart() {
  let cartInfo = '';
  let totalAmount=0;
  for (let i = 0; i < cart.length; i++) {
    let price= parseFloat(cart[i][1].substring(0,4))
    let quantity=cart[i][3];
    let totalFood= price*quantity;
    totalAmount+=totalFood;
    cartInfo += `<tr style="height: 70px;border-bottom: 1px solid #333;">
                    <td>${i + 1}</td>
                    <td><img src="${cart[i][2]}" style="height: 50px; width:50px"></td>
                    <td>${cart[i][0]}</td>
                    <td>${cart[i][1]}</td>
                    <td>${cart[i][3]}</td>
                    <td>${totalFood}$</td>
                    <td><button class="btn btn-danger" onclick="removeFromCart(${i})">Remove</button></td> <!-- Nút xóa -->
                </tr>`;           
  }
  document.getElementById('mycart').innerHTML = cartInfo;
  document.getElementById('totalAmount').innerText = totalAmount.toFixed(2)+"$";

}

function removeFromCart(index) {
  cart.splice(index, 1); // Xóa món ăn khỏi giỏ hàng dựa trên chỉ mục
  showMyCart(); // Hiển thị lại giỏ hàng sau khi xóa
}