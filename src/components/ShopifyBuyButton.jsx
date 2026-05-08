import { useEffect, useRef } from 'react'

export default function ShopifyBuyButton() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'

    function ShopifyBuyInit() {
      const client = window.ShopifyBuy.buildClient({
        domain: 'zcz4an-kd.myshopify.com',
        storefrontAccessToken: '717216c56c30145c9470eec48bed19f5',
      })

      window.ShopifyBuy.UI.onReady(client).then(function (ui) {
        const node = document.getElementById('product-component-1778231372648')
        if (!node || node.childElementCount > 0) return

        ui.createComponent('product', {
          id: '9115737555096',
          node,
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': 'calc(25% - 20px)',
                    'margin-left': '20px',
                    'margin-bottom': '50px',
                  },
                },
                button: {
                  'font-family': 'Montserrat, sans-serif',
                  'font-weight': 'bold',
                  'font-size': '16px',
                  'padding-top': '16px',
                  'padding-bottom': '16px',
                  'padding-left': '55px',
                  'padding-right': '55px',
                  'border-radius': '28px',
                  'background-color': '#7d9e76',
                  ':hover': { 'background-color': '#718e6a' },
                  ':focus': { 'background-color': '#718e6a' },
                },
                quantityInput: {
                  'font-size': '16px',
                  'padding-top': '16px',
                  'padding-bottom': '16px',
                },
              },
              contents: {
                img:   false,
                title: false,
                price: false,
              },
              text: {
                button: 'Start My Reset',
              },
              googleFonts: ['Montserrat'],
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': { 'margin-left': '-20px' },
                },
              },
            },
            modalProduct: {
              contents: {
                img:                false,
                imgWithCarousel:    true,
                button:             false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  'font-family': 'Montserrat, sans-serif',
                  'font-weight': 'bold',
                  'font-size': '16px',
                  'padding-top': '16px',
                  'padding-bottom': '16px',
                  'padding-left': '55px',
                  'padding-right': '55px',
                  'border-radius': '28px',
                  'background-color': '#7d9e76',
                  ':hover': { 'background-color': '#718e6a' },
                  ':focus': { 'background-color': '#718e6a' },
                },
                quantityInput: {
                  'font-size': '16px',
                  'padding-top': '16px',
                  'padding-bottom': '16px',
                },
              },
              googleFonts: ['Montserrat'],
              text: { button: 'Start My Reset' },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  'font-family': 'Montserrat, sans-serif',
                  'font-weight': 'bold',
                  'font-size': '16px',
                  'padding-top': '16px',
                  'padding-bottom': '16px',
                  'border-radius': '28px',
                  'background-color': '#7d9e76',
                  ':hover': { 'background-color': '#718e6a' },
                  ':focus': { 'background-color': '#718e6a' },
                },
              },
              text: {
                total:  'Subtotal',
                button: 'Checkout',
              },
              googleFonts: ['Montserrat'],
            },
            toggle: {
              styles: {
                toggle: {
                  'font-family': 'Montserrat, sans-serif',
                  'font-weight': 'bold',
                  'background-color': '#7d9e76',
                  ':hover': { 'background-color': '#718e6a' },
                  ':focus': { 'background-color': '#718e6a' },
                },
                count: { 'font-size': '16px' },
              },
              googleFonts: ['Montserrat'],
            },
          },
        })
      })
    }

    if (window.ShopifyBuy?.UI) {
      ShopifyBuyInit()
    } else {
      const script = document.createElement('script')
      script.async = true
      script.src = scriptURL
      script.onload = ShopifyBuyInit
      document.head.appendChild(script)
    }

    return () => {
      // Clear the node on unmount so a genuine remount starts fresh
      const node = document.getElementById('product-component-1778231372648')
      if (node) node.innerHTML = ''
    }
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          #product-component-1778231372648 {
            display: flex;
            justify-content: center;
          }
          #product-component-1778231372648 > div {
            width: 100% !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
      <div id="product-component-1778231372648" />
    </>
  )
}
