<template lang="pug">
div(class="container mx-auto sm:px-2 px-8")
  h1.logo.text-6xl.text-center.my-8.text-yellow-900 Villadex
  router-view
</template>

<style lang="stylus">
body
  margin: 0
  padding: 0
  line-height: 1.5
  background-color: #ecfdf5

h1,
h2,
h3,
h4
  font-family: "Coustard", serif


h1.logo
  transform: rotate(-6deg)
  color: #fbbf24
  filter: drop-shadow(4px 7px 0 rgba(0, 0, 0, 0.25))
  text-shadow: #92400e 10px 0px 0px, #92400e 9.95004px 0.998334px 0px,
    #92400e 9.80067px 1.98669px 0px, #92400e 9.55336px 2.9552px 0px,
    #92400e 9.21061px 3.89418px 0px, #92400e 8.77583px 4.79426px 0px,
    #92400e 8.25336px 5.64642px 0px, #92400e 7.64842px 6.44218px 0px,
    #92400e 6.96707px 7.17356px 0px, #92400e 6.2161px 7.83327px 0px,
    #92400e 5.40302px 8.41471px 0px, #92400e 4.53596px 8.91207px 0px,
    #92400e 3.62358px 9.32039px 0px, #92400e 2.67499px 9.63558px 0px,
    #92400e 1.69967px 9.8545px 0px, #92400e 0.707372px 9.97495px 0px,
    #92400e -0.291995px 9.99574px 0px, #92400e -1.28844px 9.91665px 0px,
    #92400e -2.27202px 9.73848px 0px, #92400e -3.2329px 9.463px 0px,
    #92400e -4.16147px 9.09297px 0px, #92400e -5.04846px 8.63209px 0px,
    #92400e -5.88501px 8.08496px 0px, #92400e -6.66276px 7.45705px 0px,
    #92400e -7.37394px 6.75463px 0px, #92400e -8.01144px 5.98472px 0px,
    #92400e -8.56889px 5.15501px 0px, #92400e -9.04072px 4.2738px 0px,
    #92400e -9.42222px 3.34988px 0px, #92400e -9.70958px 2.39249px 0px,
    #92400e -9.89993px 1.4112px 0px, #92400e -9.99135px 0.415807px 0px,
    #92400e -9.98295px -0.583741px 0px, #92400e -9.8748px -1.57746px 0px,
    #92400e -9.66798px -2.55541px 0px, #92400e -9.36457px -3.50783px 0px,
    #92400e -8.96758px -4.4252px 0px, #92400e -8.481px -5.29836px 0px,
    #92400e -7.90968px -6.11858px 0px, #92400e -7.25932px -6.87766px 0px,
    #92400e -6.53644px -7.56803px 0px, #92400e -5.74824px -8.18277px 0px,
    #92400e -4.90261px -8.71576px 0px, #92400e -4.00799px -9.16166px 0px,
    #92400e -3.07333px -9.51602px 0px, #92400e -2.10796px -9.7753px 0px,
    #92400e -1.12153px -9.93691px 0px, #92400e -0.123887px -9.99923px 0px,
    #92400e 0.87499px -9.96165px 0px, #92400e 1.86512px -9.82453px 0px,
    #92400e 2.83662px -9.58924px 0px, #92400e 3.77978px -9.25815px 0px,
    #92400e 4.68517px -8.83455px 0px, #92400e 5.54374px -8.32267px 0px,
    #92400e 6.34693px -7.72764px 0px, #92400e 7.0867px -7.0554px 0px,
    #92400e 7.75566px -6.31267px 0px, #92400e 8.34713px -5.50686px 0px,
    #92400e 8.8552px -4.64602px 0px, #92400e 9.27478px -3.73877px 0px,
    #92400e 9.6017px -2.79415px 0px, #92400e 9.83268px -1.82162px 0px,
    #92400e 9.96542px -0.830894px 0px

a
  text-decoration: underline
  font-weight: 700
  transition: all 0.2s ease-in-out

  &:hover
    opacity: 0.8
</style>
