using API.Models.Dto;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>();
            CreateMap<Patient, PatientDto>();
            CreateMap<PatientRegisterDto, Patient>();
            CreateMap<AddDocumentationTypeDto, DocumentationType>();
            CreateMap<DocumentationType, DocumentationTypeDto>();
            CreateMap<DocumentationTypeDto, DocumentationType>();
            CreateMap<AddDocumentationDto, Documentation>();
            CreateMap<Documentation, DocumentationDto>();
        }
    }
}