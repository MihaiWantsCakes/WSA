import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "add-video-to-favorites-button": {
        "background": "transparent",
        "border": "solid 1px green",
        "color": "green"
    },
    "share-on-social-button": {
        "background": "transparent",
        "border": "solid 1px #167ac6",
        "color": "#167ac6"
    },
    "follow-artist-button": {
        "background": "transparent",
        "border": "solid 1px #167ac6",
        "color": "#167ac6"
    },
    "container-title": {
        "color": "#333333",
        "fontFamily": "'Work Sans', sans-serif",
        "borderLeft": "solid 3px #f53101",
        "paddingLeft": 10
    },
    "container-heading": {
        "borderBottom": "solid 1px rgba(213, 208, 208, 0.4)",
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "fontFamily": "'Work Sans', sans-serif"
    },
    "container-heading i": {
        "color": "#f53607!important",
        "paddingRight": 7
    },
    "page-background": {
        "background": "url(http://blog.spoongraphics.co.uk/wp-content/uploads/2012/textures/19.jpg)"
    },
    "orange-side-container": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "borderRadius": 1,
        "boxShadow": "0px 0px 1px 1px rgba(211, 211, 211, 0.51)"
    },
    "c-wrapper": {
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20,
        "boxShadow": "0px 0px 2px 0px lightgrey"
    },
    "c-wrapper-gray": {
        "borderRadius": 5,
        "background": "#fafafa"
    },
    "c-panel": {
        "borderRadius": 5,
        "background": "darkgray"
    },
    "small-margin-left": {
        "marginLeft": 15
    },
    "small-margin-right": {
        "marginRight": 15
    },
    "small-margin-left-right": {
        "marginLeft": 15,
        "marginRight": 15
    },
    "small-padding-left": {
        "paddingLeft": 15
    },
    "small-padding-right": {
        "paddingRight": 15
    },
    "small-padding-left-right": {
        "paddingLeft": 15,
        "paddingRight": 15
    },
    "big-padding-left-right": {
        "paddingLeft": 40,
        "paddingRight": 40
    },
    "no-padding-horizontal": {
        "paddingLeft": 0,
        "paddingRight": 0
    },
    "no-padding-vertical": {
        "paddingTop": 0,
        "paddingBottom": 0
    },
    "flex-space-between": {
        "display": "flex",
        "justifyContent": "space-between"
    },
    "flex-center": {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center"
    },
    "med-top-bot-margin": {
        "marginTop": 10,
        "marginBottom": 10
    },
    "big-top-bot-margin": {
        "marginTop": 20,
        "marginBottom": 20
    },
    "left": {
        "float": "left"
    },
    "right": {
        "float": "right"
    },
    "flex": {
        "display": "flex"
    },
    "flex-end": {
        "display": "flex",
        "justifyContent": "flex-end",
        "alignItems": "center"
    },
    "fullwidth": {
        "width": "100%"
    },
    "link-style": {
        "color": "#f76210",
        "fontWeight": "400",
        "textTransform": "capitalize"
    },
    "light-text": {
        "fontWeight": "300"
    },
    "text-center": {
        "textAlign": "center"
    },
    "small-text": {
        "fontSize": "small"
    },
    "small-centered-content-font": {
        "fontSize": "smaller",
        "display": "flex",
        "alignItems": "center"
    },
    "video_card_image": {
        "width": "100%",
        "height": "auto"
    },
    "iframe": {
        "width": 510,
        "height": 290
    }
});