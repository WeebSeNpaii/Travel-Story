const router = require('express').Router();
const { Authvalidate } = require('../Middlewares/Authvalidation');
const {  getusers } = require('../Controller/UserController')
const {addtravelstory} = require('../Controller/Addtravelstory')
const {allstories} = require('../Controller/Allstories')
const {Getimage} = require('../Controller/Getimage')
const upload = require('../Middlewares/multer')
const deleteimage = require('../Controller/delete')
const {edittravel} = require('../Controller/editTravel')
const {delete_travel} = require('../Controller/deleteTravel');
const isfavourite = require('../Controller/isfavourite')
const search = require('../Controller/search')
const storyfilterbyDate = require('../Controller/storyfilterbyDate')

router.get('/', Authvalidate, getusers)
router.post('/add-travel-story', Authvalidate, addtravelstory)
router.get('/alltravelstories', Authvalidate, allstories)
router.post('/image-uploads', upload.single('image'), Getimage)
router.delete('/delete-image', deleteimage)
router.put('/edit-travel-story/:id',Authvalidate, edittravel)
router.delete('/delete-travel-story/:id', Authvalidate, delete_travel)
router.put('/update-isFavourite/:id', Authvalidate,  isfavourite)
router.get('/search', Authvalidate, search)
router.get('/travel-story-filter', Authvalidate, storyfilterbyDate)

module.exports = router;