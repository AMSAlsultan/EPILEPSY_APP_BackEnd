const {Film} = require('../models/film');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('unacceptable image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, '/Users/desig/EPILEPSY_APP/backend/tmp/my-uploads')
      
    },    
    filename: function (req, file, cb) {

      const filename = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${filename}-${Date.now()}.${extension}`)
    }
  })
  
  const uploadOptions = multer({ storage: storage })
  
router.get(`/`, async (req, res) =>{
   
    let filter = {};
    if(req.query.categories)
    {
filter = {category: req.query.categories.split(',')}
    }
   
    const filmList = await Film.find(filter).populate('category');

    if (!filmList) {
        res.status(500).json({success: false})
    }
    res.send(filmList);
})

router.get(`/`, async (req, res) =>{
    const filmList = await Film.find();

    if (!filmList) {
        res.status(500).json({success: false})
    }
    res.send(filmList);
})

router.get(`/:id`, async (req, res) =>{
    const film = await Film.findById(req.params.id).populate('category');

    if (!film) {
        res.status(500).json({success: false})
    }
    res.send(film);
})

router.post(`/`, uploadOptions.single('image'), async (req , res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) 
    return res.status(400).send('Invalid Category');

    const file = req.file;
    if (!file)
    return res.status(400).send('Image missing');
    
    const filename = req.file.filename
    const appPath = `${req.protocol}://${req.get('host')}/Users/desig/EPILEPSY_APP/backend/tmp/my-uploads`;
    let film = new Film({
        name: req.body.name,
        numberofflashes: req.body.numberofflashes,
        timesofflashes: req.body.timesofflashes,
        filmstory: req.body.filmstory,
        image: `${appPath}${filename}`,
        category: req.body.category,
        isFavorite: req.body.isFavorite,
        isFeatured: req.body.isFeatured
    })
    

    film = await film.save();
   
    if(!film)
    return res.status(404).send('film can not be created')

    res.send(film);
})

/*
router.get(`/get/count`, async (req, res) =>{
    const filmCount = await Film.countDocuments()

    if(!filmCount) {
        res.status(500).json({success: false})
    }
    res.send({
        filmCount: filmCount
    });
})

router.delete('/:id', (req, res)=>{
    Film.findByIdAndRemove(req.params.id).then(film =>{
        if(film) {
            return res.status(200).json({success: true, message: 'the film is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "film not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const films = await Film.find({isFeatured: true}).limit(count);

    if (!films) {
        res.status(500).json({success: false})
    }
    res.send(films);
})



*/

module.exports =router;