using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MVCTutorial.Models
{
    [Table("songs")]
    public class Song
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!")]
        [StringLength(100, ErrorMessage = "Maximal length of the name of a song is 100 characters!")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Artist is required!")]
        [StringLength(100, ErrorMessage = "Maximal length of the name of an artist is 100 characters!")]
        public string Artist { get; set; }
        public int GenreId { get; set; }

        public Song(int id, string name, string artist, int genre)
        {
            
            this.Id = id;
            this.Name = name;
            this.Artist = artist;
            this.GenreId = genre;
        }

        public Song()
        {
        }
    }
}