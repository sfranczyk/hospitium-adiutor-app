using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }
        
        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);

            if(thing == null) return NotFound();

            return Ok(thing);
        }
        
        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);
        
            var thigToReturn = thing.ToString();

            return thigToReturn;
        }
        
        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is not a good request");
        }
    }
}