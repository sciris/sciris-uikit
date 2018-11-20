import sciris from 'sciris-js';

var CalibrationMixin = {
    data() {
      return {
        // Parameter and program set information
        activeParset:  -1,
        activeProgset: -1,
        parsetOptions: [],
        progsetOptions: [],

        // Plotting data
        showPlotControls: false,
        hasGraphs: false,
        table: null, // Not actually used on this page
        startYear: 0,
        endYear: 2018, // TEMP FOR DEMO
        activePop: "All",
        popOptions: [],
        plotOptions: [],
        yearOptions: [],
        serverDatastoreId: '',
        openDialogs: [],
        showGraphDivs: [], // These don't actually do anything, but they're here for future use
        showLegendDivs: [],
        mousex: -1,
        mousey: -1,
        figscale: 1.0,

        // Page-specific data
        parlist: [],
        poplabels:[],
        origParsetName: [],
        showParameters: false,
        calibTime: '30 seconds',
        calibTimes: ['30 seconds', 'Unlimited'],
        filterPlaceholder: 'Type here to filter parameters', // Placeholder text for second table filter box
        filterText: '', // Text in the first table filter box
      }
    },

    computed: {
      projectID()    { return sciris.projectID(this) },
      hasData()      { return sciris.hasData(this) },
      hasPrograms()  { return sciris.hasPrograms(this) },
      simStart()     { return sciris.simStart(this) },
      simEnd()       { return sciris.simEnd(this) },
      simYears()     { return sciris.simYears(this) },
      activePops()   { return sciris.activePops(this) },
      placeholders() { return sciris.placeholders(this, 1) },

      filteredParlist() {
        return this.applyParametersFilter(this.parlist)
      }
    },

    created() {
      sciris.addListener(this)
      sciris.createDialogs(this)
      if ((this.$store.state.activeProject.project !== undefined) &&
        (this.$store.state.activeProject.project.hasData) ) {
        console.log('created() called')
        this.startYear = this.simStart
        this.endYear = this.simEnd // CK: Uncomment to set the end year to 2035 instead of 2018
        this.popOptions = this.activePops
        this.serverDatastoreId = this.$store.state.activeProject.project.id + ':calibration'
        this.getPlotOptions(this.$store.state.activeProject.project.id)
          .then(response => {
            this.updateSets()
              .then(response2 => {
                this.loadParTable()
                  .then(response3 => {
                    this.reloadGraphs(false)
                  })
              })
          })
      }
    },

    watch: {
//      activeParset() {
//        this.loadParTable()
//      }
    },

    methods: {

      validateYears(){ 
        return sciris.validateYears(this) 
      },
      updateSets(){ 
        return sciris.updateSets(this) 
      },
      exportGraphs() { 
        return sciris.exportGraphs(this) 
      },
      exportResults(datastoreID) { 
        return sciris.exportResults(this, datastoreID) 
      },
      scaleFigs(frac) { 
        return sciris.scaleFigs(this, frac)
      },
      clearGraphs() { 
        return sciris.clearGraphs(this) 
      },
      togglePlotControls() { 
        return sciris.togglePlotControls(this) 
      },
      getPlotOptions(project_id) { 
        return sciris.getPlotOptions(this, project_id) 
      },
      makeGraphs(graphdata) { 
        return sciris.makeGraphs(this, graphdata, '/calibration') 
      },
      reloadGraphs(showErr) { 
        // Set to calibration=true
        return sciris.reloadGraphs(
          this, 
          this.projectID, 
          this.serverDatastoreId, 
          showErr, 
          true
        ) 
      }, 
      maximize(legend_id) { 
        return sciris.maximize(this, legend_id) 
      },
      minimize(legend_id) { 
        return sciris.minimize(this, legend_id) 
      },

      toggleParams() {
        this.showParameters = !this.showParameters
      },

      loadParTable() {
        return new Promise((resolve, reject) => {
          console.log('loadParTable() called for ' + this.activeParset)
          // TODO: Get spinners working right for this leg of initialization.
          sciris.rpc('get_y_factors', [
            this.projectID, 
            this.activeParset, 
            this.toolName(), 
          ])
          .then(response => {
            this.parlist = response.data.parlist // Get the parameter values
            var tmpParset = _.cloneDeep(this.activeParset)
            this.activeParset = null
            sciris.sleep(500).then(response => {
              this.activeParset = tmpParset
            })
            this.parlist.push('Update Vue DOM')
            this.parlist.pop()
            this.poplabels = response.data.poplabels
            console.log(response)
            console.log(this.poplabels)
            console.log(this.parlist)
            resolve(response)
          })
          .catch(error => {
            sciris.fail(this, 'Could not load parameters', error)
            reject(error)
          })
        })
      },

      saveParTable() {
        return new Promise((resolve, reject) => {
          sciris.rpc('set_y_factors', [
            this.projectID, 
            this.activeParset, 
            this.parlist, 
            this.toolName(), 
          ])
          .then(response => {
            this.loadParTable()
              .then(response2 => {
                sciris.succeed(this, 'Parameters updated')
                this.manualCalibration(this.projectID)
                resolve(response2)
              })
            resolve(response)
          })
          .catch(error => {
            sciris.fail(this, 'Could not save parameters', error)
            reject(error)
          })
        })
      },

      applyParametersFilter(parlist) {
        return parlist.filter(par => ((par.parcategory.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1)
                                      || (par.parlabel.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1)))
      },

      renameParsetModal() {
        console.log('renameParsetModal() called');
        this.origParsetName = this.activeParset // Store this before it gets overwritten
        this.$modal.show('rename-parset');
      },

      renameParset() {
        console.log('renameParset() called for ' + this.activeParset)
        this.$modal.hide('rename-parset');
        sciris.start(this)
        sciris.rpc('rename_parset', [this.projectID, this.origParsetName, this.activeParset]) // Have the server copy the project, giving it a new name.
          .then(response => {
            this.updateSets() // Update the project summaries so the copied program shows up on the list.
            // TODO: look into whether the above line is necessary
            sciris.succeed(this, 'Parameter set "'+this.activeParset+'" renamed') // Indicate success.
          })
          .catch(error => {
            sciris.fail(this, 'Could not rename parameter set', error)
          })
      },

      copyParset() {
        console.log('copyParset() called for ' + this.activeParset)
        sciris.start(this)
        sciris.rpc('copy_parset', [this.projectID, this.activeParset]) // Have the server copy the project, giving it a new name.
          .then(response => {
            this.updateSets() // Update the project summaries so the copied program shows up on the list.
            // TODO: look into whether the above line is necessary
            this.activeParset = response.data
            sciris.succeed(this, 'Parameter set "'+this.activeParset+'" copied') // Indicate success.
          })
          .catch(error => {
            sciris.fail(this, 'Could not copy parameter set', error)
          })
      },

      deleteParset() {
        console.log('deleteParset() called for ' + this.activeParset)
        sciris.start(this)
        sciris.rpc('delete_parset', [this.projectID, this.activeParset]) // Have the server delete the parset.
          .then(response => {
            this.updateSets() // Update the project summaries so the deleted parset shows up on the list.
            .then(response2 => {
              this.loadParTable() // Reload the parameters.
              sciris.succeed(this, 'Parameter set "'+this.activeParset+'" deleted') // Indicate success.
            })    
          })
          .catch(error => {
            sciris.fail(this, 'Cannot delete last parameter set: ensure there are at least 2 parameter sets before deleting one', error)
          })
      },

      downloadParset() {
        console.log('downloadParset() called for ' + this.activeParset)
        sciris.start(this)
        sciris.download('download_parset', [this.projectID, this.activeParset]) // Have the server copy the project, giving it a new name.
          .then(response => { // Indicate success.
            sciris.succeed(this, '')  // No green popup message.
          })
          .catch(error => {
            sciris.fail(this, 'Could not download parameter set', error)
          })
      },

      uploadParset() {
        console.log('uploadParset() called')
        sciris.upload('upload_parset', [this.projectID], {}, '.par') // Have the server copy the project, giving it a new name.
          .then(response => {
            sciris.start(this)
            this.updateSets() // Update the project summaries so the copied program shows up on the list.
            .then(response2 => {
              this.activeParset = response.data
              this.loadParTable() // Reload the parameters.
              sciris.succeed(this, 'Parameter set "' + this.activeParset + '" uploaded') // Indicate success.
            })
          })
          .catch(error => {
            sciris.fail(this, 'Could not upload parameter set', error)
          })
      },

      manualCalibration(project_id) {
        console.log('manualCalibration() called')
        this.validateYears()  // Make sure the start end years are in the right range.
        sciris.start(this)
        sciris.rpc('manual_calibration', [
          project_id, 
          this.serverDatastoreId
        ], {
          'parsetname': this.activeParset, 
          'plot_options': this.plotOptions,
          'plotyear':this.endYear, 
          'pops':this.activePop, 
          'tool': this.toolName(), 
          'cascade':null
        }) // Go to the server to get the results
        .then(response => {
          this.makeGraphs(response.data)
          this.table = response.data.table
          sciris.succeed(this, 'Simulation run, graphs now rendering...')
        })
        .catch(error => {
          console.log(error.message)
          sciris.fail(this, 'Could not run manual calibration', error)
        })
      },

      autoCalibrate(project_id) {
        console.log('autoCalibrate() called')
        this.validateYears()  // Make sure the start end years are in the right range.
        sciris.start(this)
        if (this.calibTime === '30 seconds') {
          var maxtime = 30
        } else {
          var maxtime = 9999
        }
        sciris.rpc('automatic_calibration', [
          project_id, 
          this.serverDatastoreId
        ], {
          'parsetname': this.activeParset, 
          'max_time': maxtime, 
          'plot_options': this.plotOptions,
          'plotyear': this.endYear, 
          'pops': this.activePop, 
          'tool': this.toolName(), 
          'cascade':null
        }) // Go to the server to get the results from the package set.
        .then(response => {
          this.table = response.data.table
          this.makeGraphs(response.data.graphs)
          sciris.succeed(this, 'Simulation run, graphs now rendering...')
        })
        .catch(error => {
          console.log(error.message)
          sciris.fail(this, 'Could not run automatic calibration', error)
        })
      },

      reconcile() {
        console.log('reconcile() called for ' + this.activeParset)
        sciris.start(this)
        sciris.download('reconcile', [this.projectID, this.activeParset]) // Have the server copy the project, giving it a new name.
          .then(response => { // Indicate success.
            sciris.succeed(this, '')  // No green popup message.
          })
          .catch(error => {
            sciris.fail(this, 'Could not reconcile program set', error)
          })
      },
    }
}

export default CalibrationMixin 
