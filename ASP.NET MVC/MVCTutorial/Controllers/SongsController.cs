using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVCTutorial.Controllers
{
    public class SongsController : Controller
    {
        // GET: Songs
        public ActionResult Index()
        {
            return Content("Hello World!");
        }

        // GET: Songs/Square/<id>
        public ActionResult Square(int id)
        {
            return Content((id*id).ToString());
        }
    }
}