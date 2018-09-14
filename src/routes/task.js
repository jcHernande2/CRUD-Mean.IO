const router=require('express').Router();
const mongojs=require('mongojs');
const db=mongojs('mean-db',['tasks']);



router.get('/task',(req,res,next)=>{
    db.tasks.find((err,tasks)=>{
        if(err) return next(err);
        res.json(tasks);
    });

});
router.get('/task/:id',(req,res,next)=>{
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},(err,task)=>{
        if(err) return next(err);
        res.json(task);
    });
});
router.post('/task',(req,res,next)=>{
    const task=req.body;
    if(task.title||task.isDone+''){
        res.status(400).json({
            error:'Bad data'
        });
    }
    else{
        db.tasks.save(task,(err,task)=>{
            if(err) return next(err);
            res.json(task);
        });
    }
  
});
router.delete('/task/:id',(req,res,next)=>{
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},(err,task)=>{
        if(err) return next(err);
        res.json(task);
    });
});
router.put('/task/:id',(req,res,next)=>{
    const task1=req.body;
    const UpdateTask={};
    if(task1.isDone){
        UpdateTask.isDone=task1.isDone;
    }
    if(task1.title){
        UpdateTask.title=task1.title;
    }
    if(!UpdateTask){
        res.status(400).json({
            error:'bad request'
        });
    }else{
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},(err,task)=>{
            if(err) return next(err);
            res.json(task);
        });
    }
});
module.exports=router;