import {Util} from "../Util";

/**
 * @Serializable
 */
export class EnergyInformation {

    energy: number;
    energyCapacity: number;
    availableForDistribution: boolean;

    static isFull(energyInformation: EnergyInformation): boolean {
        return energyInformation.energy === energyInformation.energyCapacity;
    }

    static isEmpty(energyInformation: EnergyInformation): boolean {
        return energyInformation.energy === 0;
    }

    /**
     * @param structure
     * @returns {EnergyInformation} if structure can hold energy
     */
    static ofStructure(structure: Structure): EnergyInformation|undefined {
        var storedEnergy = 0;
        var energyCapacity = 0;
        var energyAvailableForDistribution: boolean;

        switch (structure.structureType) {
            case STRUCTURE_EXTENSION:
                energyAvailableForDistribution = false;
                storedEnergy = (<Extension> structure).energy;
                energyCapacity = (<Extension> structure).energyCapacity;
                break;
            case STRUCTURE_CONTAINER:
            case STRUCTURE_STORAGE:
                // both, for StructureStorage and StructureContainer use *StructureStorage*
                energyAvailableForDistribution = true;
                var store = (<StructureStorage> structure).store;
                storedEnergy = <number> store[RESOURCE_ENERGY] || 0;
                var allStorageUnits: number = _.sum(store);
                energyCapacity = (<StructureStorage> structure).storeCapacity - (allStorageUnits - storedEnergy);
                break;
            case STRUCTURE_LINK:
                energyAvailableForDistribution = true;
                storedEnergy = (<Link> structure).energy;
                energyCapacity = (<Extension> structure).energyCapacity;
                break;
            case STRUCTURE_SPAWN:
                energyAvailableForDistribution = false;
                storedEnergy = (<Spawn> structure).energy;
                energyCapacity = (<Spawn> structure).energyCapacity;
                break;
            case STRUCTURE_TOWER:
                energyAvailableForDistribution = false;
                storedEnergy = (<Tower> structure).energy;
                energyCapacity = (<Tower> structure).energyCapacity;
                break;
            default:
                return undefined;
        }

        var energyInformation = new EnergyInformation();
        energyInformation.energy = storedEnergy;
        energyInformation.energyCapacity = energyCapacity;
        energyInformation.availableForDistribution = energyAvailableForDistribution;
        return energyInformation;
    }
}