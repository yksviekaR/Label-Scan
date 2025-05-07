using AutoMapper;
using CodeApi.Dto;
using CodeApi.Models;

namespace CodeApi.Map
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Items, ItemsDto>();
            CreateMap<Users, UsersDto>();
            CreateMap<UserSnacks, UserSnacksDto>();
            CreateMap<ItemsDto, Items>();
            CreateMap<UsersDto, Users>();
            CreateMap<UserSnacksDto, UserSnacks>();
        }

        internal async Task Map<T>(Task<Users> task)
        {
            throw new NotImplementedException();
        }
    }
}
