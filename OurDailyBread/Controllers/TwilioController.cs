﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Twilio.TwiML;
using Twilio.TwiML.Mvc;

namespace OurDailyBread.Controllers
{
    public class TwilioController : Controller
    {
        //
        // GET: /Twilio/
        public ActionResult Index()
        {
            var response = new TwilioResponse();
            response.Play("http://cloud.faithcomesbyhearing.com/mp3audiobibles2/ENGESVO2DA/A19__090_Psalms______ENGESVO2DA.mp3");
            return new TwiMLResult(response);
        }
	}
}