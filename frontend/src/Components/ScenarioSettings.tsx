import React, { useState } from 'react'
import Layout from './Layout'
import type {Scenario} from '../scenarios'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import scenarios from '../scenarios'
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export type ScenarioSettingsProps = {
  scenario: Scenario
}


type AiPersonality = "serious" | "shy" | "flirty";



const ScenarioSettings = () => {
  const { scenarioId } = useParams();
  const [isTrainingMode, setIsTrainingMode] = useState(true)
  const [aiPersonality, setAiPersonality] = useState<AiPersonality>("playful")
  const navigate = useNavigate()

  const scenario: Scenario | undefined = scenarios.find(scenario => scenario.id === scenarioId)

  if (!scenario) {
    navigate(`/`)
    console.log("errorr")
    return
  }

  function onStartScenario(event): void {
    navigate(`/scenarios/${scenarioId}`)
  }

  return (
    <Layout>
        <div className='p-6'>
            {!scenario && 
              <div className="text-red-500">Scenario not found</div>
            }
            
            <div className='flex flex-col md:flex-row md:h-120'>
              <div className='flex flex-col flex-1 h-full gap-4'>
                <div>
                  <Switch
                    id='training-mode'
                    checked={isTrainingMode}
                    onChange={() => setIsTrainingMode(prev => !prev)}
                  />
                  <div className="relative inline-block">
                    <label htmlFor="training-mode" className="text-white">
                      Training Mode
                    </label>

                    <div className="relative -top-4 right-0  inline-block group">
                      <QuestionMarkIcon className=" cursor-pointer text-gray-500 group-hover:text-gray-300" />

                      {/* Tooltip - only appears when hovering over the icon */}
                      <div className="absolute bottom-0 left-full bg-gray-800 text-white text-xs px-2 py-1 w-32 rounded hidden group-hover:block">
                        More info about training mode
                      </div>
                    </div>
                  </div>
                </div>

                <div className=''>
                  <FormControl fullWidth>
                    <InputLabel className='text-white' id="ai-personality">Personality type</InputLabel>
                    <Select
                      variant='standard'
                      labelId="ai-personality"
                      id="ai-personality"
                      value={aiPersonality}
                      onChange={event => setAiPersonality(event.target.value as AiPersonality)}
                    >
                      <MenuItem value="serious">Serious</MenuItem>
                      <MenuItem value="flirty">Flirty</MenuItem>
                      <MenuItem value="shy">Shy</MenuItem>
                    </Select>
                  </FormControl>
                  
                </div>

                <div>
                  <Button variant='contained' onClick={onStartScenario}>
                    Start Rizzing
                  </Button>
                </div>
              
              </div>

              <div className='flex-1'>
                <img 
                  src={`/${scenario.image}`} 
                  alt={scenario.description} 
                  className='h-full object-cover w-full'
                />
              </div>

            </div>
        </div>
    </Layout>
  )
}

export default ScenarioSettings
