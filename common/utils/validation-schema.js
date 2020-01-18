const Joi    = require('@hapi/joi')
const {
    imagesPerPage,
    sectionImagesPerPage,
    slidesPerPage,
    projectsPerPage
} = require('../constants/limits')

const MAX_SMALLINT_VALUE = 32767
const MAX_INT_VALUE      = 2147483647

module.exports = {

    /*
    **
    ** image
    **
    */
    imageId:     Joi.number().integer().positive().max(MAX_INT_VALUE),
    imageOffset: Joi.number().integer().min(0).max(Math.floor(MAX_INT_VALUE / imagesPerPage)),


    /*
    **
    ** section
    **
    */
    sectionId:   Joi.number().integer().positive().max(MAX_SMALLINT_VALUE),
    sectionName: Joi.string().min(1).max(50),


    /*
    **
    ** section-image
    **
    */
    sectionImageId:     Joi.number().integer().positive().max(MAX_SMALLINT_VALUE),
    sectionImageOffset: Joi.number().integer().min(0).max(Math.floor(MAX_SMALLINT_VALUE / sectionImagesPerPage)),


    /*
    **
    ** slide
    **
    */
    slideId:     Joi.number().integer().positive().max(MAX_SMALLINT_VALUE),
    slideOffset: Joi.number().integer().min(0).max(Math.floor(MAX_SMALLINT_VALUE / slidesPerPage)),


    /*
    **
    ** user
    **
    */
    userId:       Joi.number().integer().positive().max(MAX_SMALLINT_VALUE),
    userLogin:    Joi.string().min(3).max(30),
    userPassword: Joi.string().min(5).max(100),


    /*
    **
    ** project
    **
    */
    projectId:     Joi.number().integer().positive().max(MAX_SMALLINT_VALUE),
    projectName:   Joi.string().length(50),
    projectOffset: Joi.number().integer().min(0).max(Math.floor(MAX_SMALLINT_VALUE / projectsPerPage)),


    /*
    **
    ** project-image
    **
    */
    projectImageId: Joi.number().integer().positive().max(MAX_INT_VALUE),


    /*
    **
    **
    **
    */
    login:    Joi.string().regex(/^[\-\_a-zA-Z0-9]{3,30}$/),
    password: Joi.string().regex(/^.{5,100}$/)

}
