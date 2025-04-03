var app = new Vue({
    el: "#app",
    data: {
      products: [
        {
          id: 1,
          title: "Лемон Квин (Lemon Queen)",
          short_text: "Сорт с нежно-жёлтыми лепестками и тёмной серединой. Отличается высокой урожайностью и привлекает пчёл.",
          image: "img/sl1.jpg",
          desc: "Высокий урожайный сорт, устойчивый к засухе. Привлекает пчёл и бабочек.",
          plant: [
            " Высота 150-180 см, прочный стебель, густая листва.",
          ],
          fruit: [
            "Лепестки ярко-жёлтые с тёмной серединой, диаметр 10-15 см.",
        ]
        },
        {
          id: 2,
          title: "Мулен Руж (Moulin Rouge F1)",
          short_text: "Эффектный сорт с насыщенно-красными лепестками. Отлично смотрится в садовых композициях.",
          image: "img/sl2.jpg",
          desc: "Уникальный декоративный сорт, устойчивый к непогоде, подходит для срезки.",
          plant: [
            " Высота 120-150 см, средняя облиственность, крепкий стебель."
          ],
          fruit: [
            "Глубокий бордово-красный цвет, диаметр 12-18 см, контрастная тёмная середина."   
          ]
        },
        {
          id: 3,
          title: "Ринг оф Фаер (Ring of Fire)",
          short_text: "Сорт с уникальным огненно-красным центром и жёлтыми краями лепестков. Идеален для украшения клумб.",
          image: "img/sl3.jpg",
          desc: "Декоративный сорт с необычной расцветкой, хорош для клумб и букетов.",
          plant: [
            "Высота 120-140 см, крепкое, ветвистое.",
          ],
          fruit: [
            "Огоньковый окрас – красная основа лепестков с жёлтыми кончиками, диаметр 10-15 см."
          ]
        },
        {
          id: 4,
          title: "Санбим (Sunbeam)",
          short_text: "Ярко-жёлтый подсолнечник с крупной серединой. Устойчив к ветру и засухе, один из популярных декоративных сортов.",
          image: "img/sl4.jpg",
          desc: "Один из самых популярных декоративных сортов, устойчив к ветру и засухе.",
          plant: [
            " Высота 140-160 см, мощный стебель, густая листва."
          ],
          fruit: [
            "Ярко-жёлтый цвет с крупной серединой, диаметр 12-20 см."
          ]
        },
        {
          id: 5,
          title: "Красное солнышко (Red Sun)",
          short_text: "Сорт с глубокими бордово-красными лепестками и тёмной серединой. Отлично подходит для срезки и букетов.",
          image: "img/sl5.jpg",
          desc: "Эффектный сорт с насыщенным красным цветом, идеально подходит для срезки.",
          plant: [
            " Высота 150-180 см, стройное, средняя облиственность."
          ],
          fruit: [
            "Темно-красные лепестки с почти чёрной серединой, диаметр 12-17 см."
          ]
        }
      ],
      product: {},
      btnVisible: 0,
      cart: [],
      contactFields: {},
      orderSubmitted: false
    },
    mounted: function() {
      this.getProduct();
      this.checkInCart();
      this.cart = this.getCart();
    },
    methods: {
      makeOrder: function() {
        console.log("Order placed. User information:", this.contactFields);
        this.cart = [];
        localStorage.removeItem("cart");
        this.orderSubmitted = true;
      },
      addToCart: function(id) {
        var cart = [];
        if (window.localStorage.getItem("cart")) {
          cart = window.localStorage.getItem("cart").split(",");
        }
        if (cart.indexOf(String(id)) === -1) {
          cart.push(id);
          window.localStorage.setItem("cart", cart.join(","));
          this.btnVisible = 1;
        }
      },
      getProduct: function() {
        if (window.location.hash) {
          var id = window.location.hash.replace("#", "");
          if (this.products.length > 0) {
            for (let i in this.products) {
              if (this.products[i].id == id) {
                this.product = this.products[i];
              }
            }
          }
        }
      },
      checkInCart: function() {
        let cart = window.localStorage.getItem("cart")
          ? window.localStorage.getItem("cart").split(",")
          : [];
        this.btnVisible = cart.includes(String(this.product.id)) ? 1 : 0;
      },
      getCart: function() {
        let storedCart = window.localStorage.getItem("cart")
          ? window.localStorage.getItem("cart").split(",")
          : [];
        let cart = [];
        storedCart.forEach(id => {
          let product = this.products.find(item => item.id == id);
          if (product) {
            cart.push(product);
          }
        });
        return cart;
      },
      removeFromCart: function(index) {
        let stored = window.localStorage.getItem("cart");
        if (!stored) return;
        let storedCart = stored.split(",");
        let product = this.cart[index];
        let idStr = String(product.id);
        let newCart = storedCart.filter(item => item !== idStr);
        window.localStorage.setItem("cart", newCart.join(","));
        this.cart.splice(index, 1);
      }
    }
  });
  