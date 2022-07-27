app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
        `<div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <a :href="url"><img :class="{ 'out-of-stock-img': !inStock }" :src="image" alt="green socks" /></a>
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ sale }}</p>
                <p v-if="inStock > 10">Instock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost Sold Out!</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <product-details :details="details"> </product-details>
                <div class="color-circle" :style="{ backgroundColor: variant.color }" v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)"></div>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
                <button 
                    class="button" 
                    :class="{ disabledButton: !inStock }" 
                    :disabled="!inStock" 
                    @click="removeFromCart">
                    Remove Item
                  </button>
                <button class="button" :class="{ disabledButton: !inStock}" :disabled="!inStock" v-on:click="addToCart">
          Add to Cart
        </button>
            </div>
        </div>
        <review-list v-if="reviews.length"  :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            url: 'https://vue-socks.timirwing.dev/img/greenSocks.fcf06f2c.jpg',
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            reviews: [],
            tabs: ['review-form', 'review-list'],
            sizes: ['S', 'M', 'L', 'XL'],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        addReview(review) {
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale.'
            }
            return ''
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})