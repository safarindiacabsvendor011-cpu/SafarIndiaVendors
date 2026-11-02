import React from 'react';
import { 
  Car, 
  UserCheck, 
  PlusCircle, 
  ShieldCheck, 
  Calendar, 
  Fuel, 
  Phone, 
  AlertTriangle,
  Search,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { FleetVehicle, Driver, VehicleCategory } from '../types';

interface FleetManagerProps {
  fleet: FleetVehicle[];
  drivers: Driver[];
  lang: 'en' | 'hi';
  onAddVehicle: (veh: Omit<FleetVehicle, 'id'>) => void;
  onAddDriver: (drv: Omit<Driver, 'id'>) => void;
}

export const FleetManager: React.FC<FleetManagerProps> = ({
  fleet,
  drivers,
  lang,
  onAddVehicle,
  onAddDriver,
}) => {
  const [subTab, setSubTab] = React.useState<'vehicles' | 'drivers'>('vehicles');
  const [showAddVehModal, setShowAddVehModal] = React.useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Form states
  const [newVehNumber, setNewVehNumber] = React.useState('');
  const [newVehModel, setNewVehModel] = React.useState('');
  const [newVehCategory, setNewVehCategory] = React.useState<VehicleCategory>('Sedan (Dzire / Etios)');
  const [newVehFuel, setNewVehFuel] = React.useState<'CNG' | 'Diesel' | 'Petrol' | 'EV'>('CNG');
  const [newVehFitness, setNewVehFitness] = React.useState('2027-10-15');
  const [newVehInsurance, setNewVehInsurance] = React.useState('2027-05-20');

  const [newDrvName, setNewDrvName] = React.useState('');
  const [newDrvPhone, setNewDrvPhone] = React.useState('');
  const [newDrvLicense, setNewDrvLicense] = React.useState('');
  const [newDrvExp, setNewDrvExp] = React.useState(5);
  const [newDrvCar, setNewDrvCar] = React.useState(fleet[0]?.vehicleNumber || '');

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehNumber || !newVehModel) return;
    onAddVehicle({
      vehicleNumber: newVehNumber.toUpperCase(),
      model: newVehModel,
      category: newVehCategory,
      fuelType: newVehFuel,
      aitpPermit: true,
      fitnessExp: newVehFitness,
      insuranceExp: newVehInsurance,
      status: 'available',
    });
    setNewVehNumber('');
    setNewVehModel('');
    setShowAddVehModal(false);
  };

  const handleCreateDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrvName || !newDrvPhone || !newDrvLicense) return;
    onAddDriver({
      name: newDrvName,
      phone: newDrvPhone,
      licenseNumber: newDrvLicense.toUpperCase(),
      experienceYears: Number(newDrvExp) || 3,
      rating: 5.0,
      policeVerified: true,
      assignedVehicle: newDrvCar,
    });
    setNewDrvName('');
    setNewDrvPhone('');
    setNewDrvLicense('');
    setShowAddDriverModal(false);
  };

  const filteredFleet = fleet.filter((v) => 
    v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDrivers = drivers.filter((d) => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.phone.includes(searchTerm) ||
    d.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-amber-400" />
            <span>{lang === 'en' ? 'Fleet & Driver Roster' : 'गाड़ी व ड्राइवर प्रबंधन'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'en'
              ? 'Track your vehicles, All India Tourist Permits (AITP), fitness validity, and police-verified drivers.'
              : 'अपनी गाड़ियां, ऑल इंडिया परमिट, फिटनेस व इंश्योरेंस वैधता और चालकों का विवरण रखें।'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {subTab === 'vehicles' ? (
            <button
              onClick={() => setShowAddVehModal(true)}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === 'en' ? '+ Add Vehicle' : '+ नई गाड़ी जोड़ें'}</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddDriverModal(true)}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === 'en' ? '+ Add Driver' : '+ नया ड्राइवर जोड़ें'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setSubTab('vehicles')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              subTab === 'vehicles'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'My Vehicles' : 'मेरी गाड़ियां'}</span>
            <span className="font-mono tabular-nums text-[11px] font-bold px-1.5 py-0.2 rounded bg-black/15">
              {fleet.length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('drivers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              subTab === 'drivers'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Verified Drivers' : 'सत्यापित ड्राइवर'}</span>
            <span className="font-mono tabular-nums text-[11px] font-bold px-1.5 py-0.2 rounded bg-black/15">
              {drivers.length}
            </span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={subTab === 'vehicles' ? 'Search number or model...' : 'Search driver name or license...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      {subTab === 'vehicles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFleet.map((v) => (
            <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono font-bold text-base text-amber-400 tracking-wide">
                    {v.vehicleNumber}
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">{v.model}</div>
                  <div className="text-xs text-slate-400">{v.category}</div>
                </div>

                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    v.status === 'available' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' :
                    v.status === 'on_trip' ? 'bg-blue-950/60 text-blue-400 border border-blue-800/60' :
                    'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                  }`}>
                    {v.status === 'available' ? (lang === 'en' ? 'Available' : 'उपलब्ध') :
                     v.status === 'on_trip' ? (lang === 'en' ? 'On Trip' : 'सफ़र में') : 'Maintenance'}
                  </span>
                </div>
              </div>

              {/* Specs & documents */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-slate-500" />
                  <span>Fuel: <strong className="text-slate-200">{v.fuelType}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AITP Permit: <strong className="text-emerald-400">Active</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Fitness: <strong className="text-slate-300 font-mono">{v.fitnessExp}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Insurance: <strong className="text-slate-300 font-mono">{v.insuranceExp}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drivers Grid */}
      {subTab === 'drivers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrivers.map((d) => (
            <div key={d.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{d.name}</span>
                    {d.policeVerified && (
                      <span title="Police Verified">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </span>
                    )}
                  </h2>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {d.experienceYears} Years Exp. · ★ {d.rating}
                  </div>
                </div>

                <a
                  href={`tel:${d.phone}`}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors"
                  title="Call Driver"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>DL Number:</span>
                  <span className="font-mono text-slate-200">{d.licenseNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Assigned Cab:</span>
                  <span className="font-mono text-amber-400 font-semibold">{d.assignedVehicle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Vehicle */}
      {showAddVehModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Register New Commercial Cab' : 'नई गाड़ी पंजीकृत करें'}</span>
            </h2>

            <form onSubmit={handleCreateVehicle} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Registration Number (e.g. DL 01 ZA 4482)</label>
                <input
                  type="text"
                  required
                  placeholder="DL 01 ZA 4482"
                  value={newVehNumber}
                  onChange={(e) => setNewVehNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono uppercase focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Model & Year (e.g. Swift Dzire Tour 2024)</label>
                <input
                  type="text"
                  required
                  placeholder="Swift Dzire Tour 2024 White"
                  value={newVehModel}
                  onChange={(e) => setNewVehModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newVehCategory}
                    onChange={(e) => setNewVehCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios)</option>
                    <option value="SUV (Ertiga / Carens)">SUV (Ertiga / Carens)</option>
                    <option value="Prime SUV (Innova Crysta)">Innova Crysta</option>
                    <option value="Tempo Traveller (12-20s)">Tempo Traveller</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Fuel Type</label>
                  <select
                    value={newVehFuel}
                    onChange={(e) => setNewVehFuel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="CNG">CNG</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="EV">Electric (EV)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Fitness Expiry</label>
                  <input
                    type="date"
                    value={newVehFitness}
                    onChange={(e) => setNewVehFitness(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Insurance Expiry</label>
                  <input
                    type="date"
                    value={newVehInsurance}
                    onChange={(e) => setNewVehInsurance(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddVehModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Driver */}
      {showAddDriverModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Register New Commercial Driver' : 'नया ड्राइवर जोड़ें'}</span>
            </h2>

            <form onSubmit={handleCreateDriver} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Driver Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Singh"
                  value={newDrvName}
                  onChange={(e) => setNewDrvName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98110 00000"
                    value={newDrvPhone}
                    onChange={(e) => setNewDrvPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Driving Experience</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={newDrvExp}
                    onChange={(e) => setNewDrvExp(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Commercial DL Number</label>
                <input
                  type="text"
                  required
                  placeholder="DL-0420200088912"
                  value={newDrvLicense}
                  onChange={(e) => setNewDrvLicense(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono uppercase focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Assign to Vehicle</label>
                <select
                  value={newDrvCar}
                  onChange={(e) => setNewDrvCar(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                >
                  {fleet.map((v) => (
                    <option key={v.id} value={v.vehicleNumber}>
                      {v.vehicleNumber} ({v.model})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddDriverModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
