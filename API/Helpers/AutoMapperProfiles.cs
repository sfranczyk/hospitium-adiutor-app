using API.Models.Dto;
using API.Models;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<AppUser, WorkerDto>();
            
            CreateMap<Patient, PatientDto>()
                .ForMember(dest => dest.HealthFacility,
                    opt => opt.MapFrom(src => src.Department.HealthFacility));
            CreateMap<PatientRegisterDto, Patient>();

            CreateMap<AddDepartmentDto, Department>();
            CreateMap<DepartmentDto, Department>();
            CreateMap<Department, DepartmentDto>();
            CreateMap<Department, DepartmentNameDto>();
            CreateMap<string, Department>().ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src));

            CreateMap<AddHealthFacilityDto, HealthFacility>();
            CreateMap<UpdateHealthFacilityDto, HealthFacility>();
            CreateMap<HealthFacilityDto, HealthFacility>();
            CreateMap<HealthFacility, HealthFacilityDto>();
            CreateMap<HealthFacility, HealthFacilityNameDto>();

            CreateMap<AddDocumentationTypeDto, DocumentationType>();
            CreateMap<DocumentationType, DocumentationTypeDto>();
            CreateMap<DocumentationTypeDto, DocumentationType>();
            
            CreateMap<AddDocumentationDto, Documentation>();
            CreateMap<Documentation, DocumentationDto>()
                .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Type.Name))
                .ForMember(dest => dest.ContentDescription,
                    opt => opt.MapFrom(src => src.Type.JsonDescription));
        }
    }
}